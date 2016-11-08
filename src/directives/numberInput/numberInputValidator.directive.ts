import {NG_VALIDATORS, AbstractControl, Validator} from '@angular/forms';
import {ExistingProvider, forwardRef, Directive} from '@angular/core';

/**
 * Validator that is injected with directive NumberInputValidatorDirective
 */
const NUMBER_VALIDATOR = <ExistingProvider>
{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumberInputValidatorDirective),
    multi: true
};

/**
 * Is number directive injecting checking for number validator
 */
@Directive(
{
    selector: "input[number][formControlName],input[number][formControl],input[number][ngModel]",
    providers: [NUMBER_VALIDATOR]
})
export class NumberInputValidatorDirective implements Validator
{
    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param  {Control} control Control that is being validated
     * @returns {[key: string]: any} validation results
     */
    public validate(control: AbstractControl): {[key: string]: any}
    {
        if(isNaN(control.value))
        {
            return {
                "number": true
            };
        }

        return null;
    }
}