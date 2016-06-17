import {AbstractControl} from '@angular/common';
import {StringMapWrapper} from '@angular/core/src/facade/collection';
import {isPresent} from '@angular/core/src/facade/lang';

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
    public static setPristine(controls: {[controlName: string]: AbstractControl}): void
    {
        StringMapWrapper.forEach(controls, item =>
        {
            if(isPresent(item._pristine))
            {
                item._pristine = true;
            }
        })
    }
}