import {AbstractControl} from '@angular/forms';
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
}