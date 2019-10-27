import {NgModule} from '@angular/core';

import {MomentConvertPipe} from '../pipes/momentConvert/momentConvert.pipe';
import {MomentFormatPipe} from '../pipes/momentFormat/momentFormat.pipe';

/**
 * Module containing common stuff for moment.js in angular
 */
@NgModule(
{
    declarations:
    [
        MomentConvertPipe,
        MomentFormatPipe
    ],
    exports:
    [
        MomentConvertPipe,
        MomentFormatPipe
    ]
})
export class MomentModule
{
}