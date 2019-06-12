import {NgModule} from '@angular/core';

import {NumeralPipe} from './../pipes/numeral.pipe';

/**
 * Module for components, pipes and directives that are using numeral library
 */
@NgModule(
{
    declarations: [NumeralPipe],
    exports: [NumeralPipe]
})
export class NumeralModule
{
}