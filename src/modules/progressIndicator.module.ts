import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {ProgressIndicatorComponent} from '../components/progressIndicator/progressIndicator.component';

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
}