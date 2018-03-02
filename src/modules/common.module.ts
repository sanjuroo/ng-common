import {NgModule, ModuleWithProviders, ClassProvider, Type} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {NumeralPipe} from './../pipes/numeral.pipe';
import {NumberInputValidatorDirective} from './../directives/numberInput/numberInputValidator.directive';
import {NumberInputControlValueAccessor} from './../directives/numberInput/numberInputControlValueAccessor.directive';
import {MinValueNumberValidatorDirective} from './../directives/numberInput/minValueNumberValidator.directive';
import {MaxValueNumberValidatorDirective} from './../directives/numberInput/maxValueNumberValidator.directive';
import {CookieService} from '../services/cookies/cookies.service';
import {DataRouter} from "../services/routing/dataRouter";
import {StatusCodeService} from "../services/statusCode/statusCode.service";
import {GlobalizationService} from '../services/globalization/globalization.service';
import {NgComponentOutletEx} from "../directives/ngComponentOutletEx/ngComponentOutletEx.directive";
import {APP_STABLE_PROVIDER} from '../utils/utils.common';

/**
 * Module for common components, pipes and directives
 */
@NgModule(
{
    imports: [AngularCommonModule],
    declarations: [MaxValueNumberValidatorDirective,
                   MinValueNumberValidatorDirective,
                   NumberInputControlValueAccessor,
                   NumberInputValidatorDirective,
                   NumeralPipe,
                   NgComponentOutletEx],
    exports: [MaxValueNumberValidatorDirective,
              MinValueNumberValidatorDirective,
              NumberInputControlValueAccessor,
              NumberInputValidatorDirective,
              NumeralPipe,
              NgComponentOutletEx]
})
export class CommonModule
{
    //######################### public methods #########################

    /**
     * Returns module with cookie service and data router
     */
    public static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: CommonModule,
            providers:
            [
                CookieService,
                DataRouter,
                APP_STABLE_PROVIDER
            ]
        };
    }

    /**
     * Returns module with cookie service, status code service and data router
     */
    public static forRootBrowser(): ModuleWithProviders
    {
        return {
            ngModule: CommonModule,
            providers:
            [
                CookieService,
                DataRouter,
                APP_STABLE_PROVIDER,
                StatusCodeService
            ]
        };
    }

    /**
     * Returns module with cookie service and data router and globalization service
     * @param {Type<GlobalizationService>} globalizationService Globalization service type
     */
    public static forRootWithGlobalization(globalizationService: Type<GlobalizationService>): ModuleWithProviders
    {
        return {
            ngModule: CommonModule,
            providers:
            [
                CookieService,
                DataRouter,
                APP_STABLE_PROVIDER,
                <ClassProvider>
                {
                    provide: GlobalizationService,
                    useClass: globalizationService
                }
            ]
        };
    }

    /**
     * Returns module with cookie service, status code service and data router and globalization service
     * @param {Type<GlobalizationService>} globalizationService Globalization service type
     */
    public static forRootBrowserWithGlobalization(globalizationService: Type<GlobalizationService>): ModuleWithProviders
    {
        return {
            ngModule: CommonModule,
            providers:
            [
                CookieService,
                DataRouter,
                APP_STABLE_PROVIDER,
                StatusCodeService,
                <ClassProvider>
                {
                    provide: GlobalizationService,
                    useClass: globalizationService
                }
            ]
        };
    }
}