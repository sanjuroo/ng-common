import {NG_VALIDATORS, AbstractControl, Validator} from '@angular/forms';
import {forwardRef, Directive, Attribute, Input, ExistingProvider} from '@angular/core';
import {isBlank, isPresent} from '../../utils/lang';

/**
 * Validator that is injected with directive MinValueNumberValidatorDirective
 */
const MIN_NUMBER_VALIDATOR = <ExistingProvider>
{
    provide: NG_VALIDATORS, 
    useExisting: forwardRef(() => MinValueNumberValidatorDirective), 
    multi: true
};

/**
 * Directive injecting checking for number min value validator
 */
@Directive(
{
    selector: "input[number][minValue][formControlName],input[number][minValue][formControl],input[number][minValue][ngModel]",
    providers: [MIN_NUMBER_VALIDATOR]
})
export class MinValueNumberValidatorDirective implements Validator
{
    //######################### private fields #########################
    
    /**
     * Current min value that is allowed
     */
    private _minValue: number;

    //######################### public properties - inputs #########################
    /**
     * Bound min value that is allowed, which overrides value set to attribute minValue
     */
    @Input()
    public minValue?: number;
    
    //######################### constructor #########################
    constructor(@Attribute("minValue") minValue: string)
    {
        var value;
        
        if(isBlank(minValue) || minValue.length < 1 || isNaN(value = parseFloat(minValue.replace(",", "."))))
        {
            throw new Error("'minValue' was not specified or it is not a number!");
        }
        
        this._minValue = value;
    }
    
    //######################### public methods - implementation of Validator #########################

    /**
     * Validates input and returns validation result
     * @param  {Control} control Control that is being validated
     * @returns {[key: string]: any} validation results
     */
    public validate(control: AbstractControl): {[key: string]: any}|null
    {
        let minValue: number = isPresent(this.minValue) ? <number>this.minValue : this._minValue;        

        if(!isNaN(control.value) && isPresent(control.value) && control.value < minValue)
        {
            return {
                "minValue": minValue
            };
        }

        return null;
    }
}