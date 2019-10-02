import {NgModule} from '@angular/core';

import {HasErrorDirective} from '../directives/hasError/hasError.directive';
import {GroupHasErrorDirective} from '../directives/groupHasError/groupHasError.directive';
import {RequiredClassDirective} from '../directives/requiredClass/requiredClass.directive';

/**
 * Module for input validation directives
 */
@NgModule(
{
    declarations: [HasErrorDirective,
                   GroupHasErrorDirective,
                   RequiredClassDirective],
    exports: [HasErrorDirective,
              GroupHasErrorDirective,
              RequiredClassDirective]
})
export class HasErrorModule
{
}