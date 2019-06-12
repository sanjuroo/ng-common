import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {NgComponentOutletEx} from "../directives/ngComponentOutletEx/ngComponentOutletEx.directive";

/**
 * Module for common components, pipes and directives
 */
@NgModule(
{
    imports: [AngularCommonModule],
    declarations: [NgComponentOutletEx],
    exports: [NgComponentOutletEx]
})
export class CommonModule
{
}