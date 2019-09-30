import {Directive, ElementRef, Optional, SkipSelf, OnInit, OnDestroy, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {FormControlDirective, FormControlName, FormControl} from "@angular/forms";
import {extend, generateId, StringDictionary, format} from "@js/common";
import {Subscription} from "rxjs";

import {GroupHasErrorDirective} from "../groupHasError/groupHasError.directive";
import {SubmittedService} from "../../services/submitted";

//TODO - inputs for prefix suffix
//TODO - global options using InjectionToken

/**
 * Default error messages displayed
 */
const defaultErrorMessages: StringDictionary =
{
    required: 'Položka je požadovaná.',
    number: 'Položka musí byť číslo.',
    minValue: 'Minimálna povolená hodnota je %s.',
    maxValue: 'Maximálna povolená hodnota je %s.'
};

/**
 * Default options for HasErrorDirective
 */
const defaultOptions: HasErrorOptions =
{
    prefix: 'ng-',
    suffix: '-error',
    errorDivClass: 'validation-error-div'
};

/**
 * Options for HasErrorDirective
 */
export interface HasErrorOptions
{
    /**
     * Prefix of css classes applied to element
     */
    prefix?: string;

    /**
     * Suffix of css classes applied to element
     */
    suffix?: string;

    /**
     * Css class attached to error div
     */
    errorDivClass?: string;
}

/**
 * Directive that is attached to control element and handles css classes that are added to this element
 */
@Directive(
{
    selector: '[hasError]'
})
export class HasErrorDirective implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for changes of status of control
     */
    private _statusChangesSubscription: Subscription;

    /**
     * Subscription for changes of submitted
     */
    private _submittedChangeSubscription: Subscription;

    /**
     * Array storing last known errors css classes
     */
    private _errorsClasses: string[] = [];

    /**
     * Array storing last known errors
     */
    private _errors: string[] = [];

    /**
     * Options for directive
     */
    private _options: HasErrorOptions = null;

    /**
     * Unique generated id of control
     */
    private _id: string = generateId(10);

    /**
     * Html error div
     */
    private _errorDiv: HTMLDivElement;

    /**
     * Html attribute storing error messages
     */
    private _errorMessageAttr: Attr;

    /**
     * Last value of control pristine attribute
     */
    private _previousDirty: boolean = false;

    /**
     * Mutation observer used for observing changes on class of element
     */
    private _observer: MutationObserver;

    //######################### private properties #########################

    /**
     * Gets control which was assigned to this element
     */
    private get control(): FormControl
    {
        return (this._formControl && this._formControl.control) || (this._formControlName && this._formControlName.control);
    }

    //######################### public properties - inputs #########################

    /**
     * Object storing error messages
     */
    // @Input()
    public errorMessages: StringDictionary;

    //######################### constructor #########################
    constructor(private _element: ElementRef<HTMLElement>,
                @Optional() @SkipSelf() private _groupHasError: GroupHasErrorDirective,
                @Optional() private _formControl: FormControlDirective,
                @Optional() private _formControlName: FormControlName,
                @Optional() private _submittedSvc: SubmittedService,
                @Inject(DOCUMENT) private _document: HTMLDocument)
    {
        this._options = extend(true, {}, defaultOptions);
        this.errorMessages = extend(true, {}, defaultErrorMessages);
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this._registerMutationObserver();

        this._errorDiv = this._document.createElement('div');
        this._errorDiv.classList.add(this._options.errorDivClass);

        this._errorMessageAttr = document.createAttribute('data-error-message');

        this._errorDiv.attributes.setNamedItem(this._errorMessageAttr);
        this._element.nativeElement.after(this._errorDiv);

        if(this.control)
        {
            this._updateStatus();

            this.control.statusChanges.subscribe(() =>
            {
                this._updateStatus();
            });
        }

        if(this._submittedSvc)
        {
            this._submittedChangeSubscription = this._submittedSvc.submittedChange.subscribe(() =>
            {
                this._isSubmittedOrDirty(() => this._toggleErrors());
                this._toggleGroupHasError();
            });
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._statusChangesSubscription)
        {
            this._statusChangesSubscription.unsubscribe();
            this._statusChangesSubscription = null;
        }

        if(this._submittedChangeSubscription)
        {
            this._submittedChangeSubscription.unsubscribe();
            this._submittedChangeSubscription = null;
        }

        if(this._groupHasError)
        {
            this._groupHasError.unregisterControl(this._id);
        }

        if(this._errorDiv)
        {
            this._errorDiv.remove();
        }

        if(this._observer)
        {
            this._observer.disconnect();
        }
    }

    //######################### private methods #########################

    /**
     * Updates status of control and css classes
     */
    private _updateStatus()
    {
        this._previousDirty = this.control.dirty;
        this._toggleErrors(false);
        this._errors = this.control.errors ? Object.keys(this.control.errors) : [];
        this._errorsClasses = this._errors.map(error => `${this._options.prefix}${error.toLowerCase()}${this._options.suffix}`);
        this._isSubmittedOrDirty(() => this._toggleErrors());

        this._toggleGroupHasError();
    }

    /**
     * Toggles css classes for errors that are currently set
     */
    private _toggleErrors(add: boolean = true)
    {
        (add ? this._element.nativeElement.classList.add : this._element.nativeElement.classList.remove).apply(this._element.nativeElement.classList, this._errorsClasses);
        (add ? this._errorDiv.classList.add : this._errorDiv.classList.remove).apply(this._errorDiv.classList, this._errorsClasses);

        this._errorMessageAttr.value = (add ? this._errors : [])
            .map(error =>
            {
                if(!this.errorMessages[error])
                {
                    return null;
                }

                return format(this.errorMessages[error], this.control.errors[error]);
            })
            .filter(itm => !!itm)
            .join(' ');
    }

    /**
     * Toggles registration of control in parent group
     */
    private _toggleGroupHasError()
    {
        if(this._groupHasError)
        {
            this._isSubmittedOrDirty(() => this._groupHasError.registerControl(this._id),
                                     () => this._groupHasError.unregisterControl(this._id),
                                     !!this._errorsClasses.length)
        }
    }

    /**
     * Calls action when form is submitted or control is dirty
     * @param action Action to be called when form is submitted or control dirty
     * @param falseAction Action to be called when form is not submitted and control is not dirty
     * @param additionalCondition Additional condition to be evaluated
     */
    private _isSubmittedOrDirty(action: () => void, falseAction: () => void = () => {}, additionalCondition: boolean = true)
    {
        //submitted form or dirty control
        if(((this._submittedSvc && this._submittedSvc.submitted) ||
            (this.control && this.control.dirty)) &&
            additionalCondition)
        {
            action();
        }
        else
        {
            falseAction();
        }
    }

    /**
     * Registers mutation observer which watch for changes of class list
     */
    private _registerMutationObserver()
    {
        this._observer = new MutationObserver(() =>
        {
            if(this.control.dirty != this._previousDirty)
            {
                this._updateStatus();
            }
        });

        this._observer.observe(this._element.nativeElement, 
        {
            attributeFilter: ['class'],
            attributes: true
        });
    }
}