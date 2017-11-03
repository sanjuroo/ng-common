import {NgForm, FormGroup} from '@angular/forms';

/**
 * Utility methods form angular 2 forms
 */
export default class Forms
{
    //######################### public methods #########################
    
    /**
     * Gets indication whether controls have errors, with custom indication of submitted
     * @param  {NgForm|FormGroup} form Form containing controls
     * @param  {string[]} controls Array of controls names to be checked for errors
     * @param  {boolean} submitted Indication whether form was submitted
     */
    public static hasErrorCustom(form: NgForm|FormGroup, controls: string[], submitted: boolean = false)
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
     * @param  {NgForm|FormGroup} form Form containing controls
     * @param  {string} control Controls name that will be checked
     * @param  {string[]} errors Array of validation errors to be checked for existance
     * @param  {boolean} submitted Indication whether form was submitted
     */
    public static alertHiddenCustom(form: NgForm|FormGroup, control: string, errors: string[] = [], submitted: boolean = false)
    {
        if(!form.controls[control])
        {
            return true;
        }

        let requestedErrors = false;

        errors.forEach(errorType =>
        {
            requestedErrors = requestedErrors || (!!form.controls[control].errors && !!(<{[key: string]: any}>form.controls[control].errors)[errorType]);
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
            requestedErrors = requestedErrors || (!!form.controls[control].errors && !!(<{[key: string]: any}>form.controls[control].errors)[errorType]);
        });

        return form.controls[control].valid || !requestedErrors || (!form.controls[control].dirty && !form.submitted);
    }
}