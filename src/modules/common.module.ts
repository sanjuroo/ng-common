import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {NumeralPipe} from './../pipes/numeral.pipe';
import {NumberInputValidatorDirective} from './../directives/numberInput/numberInputValidator.directive';
import {NumberInputControlValueAccessor} from './../directives/numberInput/numberInputControlValueAccessor.directive';
import {MinValueNumberValidatorDirective} from './../directives/numberInput/minValueNumberValidator.directive';
import {MaxValueNumberValidatorDirective} from './../directives/numberInput/maxValueNumberValidator.directive';
import {ProgressIndicatorComponent} from './../components/progressIndicator/progressIndicator.component';
import {CookieService} from '../services/cookies/cookies.service';
import {DataRouter} from "../index";

//TODO - create ProgressIndicatorModule

/**
 * Module for common components, pipes and directives
 */
@NgModule(
{
    imports: [AngularCommonModule],
    declarations: [ProgressIndicatorComponent, 
                   MaxValueNumberValidatorDirective,
                   MinValueNumberValidatorDirective,
                   NumberInputControlValueAccessor,
                   NumberInputValidatorDirective,
                   NumeralPipe],
    exports: [ProgressIndicatorComponent,
              MaxValueNumberValidatorDirective,
              MinValueNumberValidatorDirective,
              NumberInputControlValueAccessor,
              NumberInputValidatorDirective,
              NumeralPipe]
})
export class CommonModule
{
    //######################### public methods #########################

    /**
     * Returns module with HttpInterceptor providers and custom Http provider that supports InterceptableHttp
     */
    public static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: CommonModule,
            providers:
            [
                CookieService,
                DataRouter
            ]
        };
    }
}