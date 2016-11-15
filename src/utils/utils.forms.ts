import {AbstractControl, NgForm} from '@angular/forms';
import {StringMapWrapper} from '@angular/core/src/facade/collection';
import {isPresent} from '@angular/core/src/facade/lang';

/**
 * Utility methods form angular 2 forms
 */
export default class Forms
{
    //######################### public methods #########################
    
    /**
     * Gets indication whether controls have errors, with custom indication of submitted
     * @param  {NgForm} form Form containing controls
     * @param  {string[]} controls Array of controls names to be checked for errors
     * @param  {boolean} submitted Indication whether form was submitted
     */
    public static hasErrorCustom(form: NgForm, controls: string[], submitted: boolean)
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

        return conditionValid && (conditionChanged || submitted);
    }


    /**
     * Gets indication whether hide alerts or not for control, with custom indication of submitted
     * @param  {NgForm} form Form containing controls
     * @param  {string} control Controls name that will be checked
     * @param  {boolean} submitted Indication whether form was submitted
     * @param  {string[]} errors Array of validation errors to be checked for existance
     */
    public static alertHiddenCustom(form: NgForm, control: string, submitted: boolean, errors: string[] = [])
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

        return form.controls[control].valid || !requestedErrors || (!form.controls[control].dirty && !submitted);
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