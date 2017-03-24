import {NgModule, ModuleWithProviders, FactoryProvider} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {ProgressIndicatorComponent} from '../components/progressIndicator/progressIndicator.component';
import {ProgressIndicatorService} from '../components/progressIndicator/progressIndicator.service';
import {ProgressIndicatorOptions} from '../components/progressIndicator/progressIndicatorOptions';

/**
 * Module for progress indicator
 */
@NgModule(
{
    imports: [AngularCommonModule],
    declarations: [ProgressIndicatorComponent],
    exports: [ProgressIndicatorComponent]
})
export class ProgressIndicatorModule
{
    //######################### public methods #########################

    /**
     * Returns module with progress indicator service
     */
    public static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: ProgressIndicatorModule,
            providers:
            [
                ProgressIndicatorService
            ]
        };
    }

    /**
     * Returns module with progress indicator service with options
     * @param options Factory method for options
     */
    public static forRootWithOptions(options: () => ProgressIndicatorOptions): ModuleWithProviders
    {
        return {
            ngModule: ProgressIndicatorModule,
            providers:
            [
                ProgressIndicatorService,
                <FactoryProvider>
                {
                    provide: ProgressIndicatorOptions,
                    useFactory: options
                }
            ]
        };
    }
}