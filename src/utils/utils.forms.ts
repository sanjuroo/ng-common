import {AbstractControl, NgForm, FormGroupDirective} from '@angular/forms';
import {StringMapWrapper} from '@angular/core/src/facade/collection';
import {isPresent, isArray} from '@angular/core/src/facade/lang';

/**
 * Utility methods form angular 2 forms
 */
export default class Forms
{
    //######################### public methods #########################
    
    /**
     * Sets all controls state to pristine
     * @param  {{[controlName:string]:AbstractControl}} controls Array of controls that are going to be set
     */
    public static setPristine(controls: {[controlName: string]: AbstractControl} | AbstractControl[]): void
    {
        for (var idx in controls)
        {
            let item: any = controls[idx];

            if(isPresent(item._pristine))
            {
                item._pristine = true;
            }
        }
    }

    
    /**
     * Clears flag indicating that form was submitted
     * @param  {NgForm|FormGroupDirective} form Form which flag should be cleared
     */
    public static clearSubmitted(form: NgForm | FormGroupDirective)
    {
        (<any>form)._submitted = false;
    }

    /**
     * Gets indication whether controls have errors
     * @param  {NgForm} form Form containing controls
     * @param  {string[]} controls Array of controls names to be checked for errors
     */
    public static hasError(form: NgForm, controls: string[])
    {
        let conditionValid = false;
        let conditionChanged = false;

        for(var x = 0; x < controls.length; x++)
        {
            if(!form.controls[controls[x]])
            {
                return false;
            }

            conditionValid = conditionValid || !form.controls[controls[x]].valid;
            conditionChanged = conditionChanged || form.controls[controls[x]].dirty;
        }

        return conditionValid && (conditionChanged || form.submitted);
    }


    /**
     * Gets indication whether hide alerts or not for control
     * @param  {NgForm} form Form containing controls
     * @param  {string} control Controls name that will be checked
     * @param  {string[]} errors Array of validation errors to be checked for existance
     */
    public static alertHidden(form: NgForm, control: string, errors: string[] = [])
    {
        if(!form.controls[control])
        {
            return true;
        }

        let requestedErrors = false;

        errors.forEach(errorType =>
        {
            requestedErrors = requestedErrors || (!!form.controls[control].errors && !!form.controls[control].errors[errorType]);
        });

        return form.controls[control].valid || !requestedErrors || (!form.controls[control].dirty && !form.submitted);
    }
}