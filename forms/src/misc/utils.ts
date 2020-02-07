import {NgForm, FormGroup} from '@angular/forms';

/**
 * Gets indication whether controls have errors, with custom indication of submitted
 * @param form - Form containing controls
 * @param controls - Array of controls names to be checked for errors
 * @param submitted - Indication whether form was submitted
 */
export function hasErrorCustom(form: NgForm|FormGroup, controls: string[], submitted: boolean = false)
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
 * @param form - Form containing controls
 * @param control - Controls name that will be checked
 * @param errors - Array of validation errors to be checked for existance
 * @param submitted - Indication whether form was submitted
 */
export function alertHiddenCustom(form: NgForm|FormGroup, control: string, errors: string[] = [], submitted: boolean = false)
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
 * @param form - Form containing controls
 * @param controls - Array of controls names to be checked for errors
 */
export function hasError(form: NgForm, controls: string[])
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
 * @param form - Form containing controls
 * @param control - Controls name that will be checked
 * @param errors - Array of validation errors to be checked for existance
 */
export function alertHidden(form: NgForm, control: string, errors: string[] = [])
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