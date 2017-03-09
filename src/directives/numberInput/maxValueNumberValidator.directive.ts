import {NG_VALIDATORS, AbstractControl, Validator} from '@angular/forms';
import {ExistingProvider, Input, forwardRef, Directive, Attribute} from '@angular/core';
import {isBlank, isPresent} from '../../utils/lang';

/**
 * Validator that is injected with directive MaxValueNumberValidatorDirective
 */
const MAX_NUMBER_VALIDATOR = <ExistingProvider>
{
    provide: NG_VALIDATORS, 
    useExisting: forwardRef(() => MaxValueNumberValidatorDirective), 
    multi: true
};

/**
 * Directive injecting checking for number max value validator
 */
@Directive(
{
    selector: "input[number][maxValue][formControlName],input[number][maxValue][formControl],input[number][maxValue][ngModel]",
    providers: [MAX_NUMBER_VALIDATOR]
})
export class MaxValueNumberValidatorDirective implements Validator
{
    //######################### private fields #########################
    
    /**
     * Current max value that is allowed
     */
    private _maxValue: number;

    //######################### public properties - inputs #########################

    /**
     * Bound max value that is allowed, which overrides value set to attribute maxValue
     */
    @Input()
    public maxValue?: number;
    
    //######################### constructor #########################
    constructor(@Attribute("maxValue") maxValue: string)
    {
        var value;
        
        if(isBlank(maxValue) || maxValue.length < 1 || isNaN(value = parseFloat(maxValue.replace(",", "."))))
        {
            throw new Error("'maxValue' was not specified or it is not a number!");
        }
        
        this._maxValue = value;
    }
    
    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param  {Control} control Control that is being validated
     * @returns {[key: string]: any} validation results
     */
    public validate(control: AbstractControl): {[key: string]: any}
    {
        let maxValue: number = isPresent(this.maxValue) ? this.maxValue : this._maxValue;                

        if(!isNaN(control.value) && isPresent(control.value) && control.value > maxValue)
        {
            return {
                "maxValue": maxValue
            };
        }

        return null;
    }
}