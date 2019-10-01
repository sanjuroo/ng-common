import {InjectionToken} from "@angular/core";
import {StringDictionary} from "@js/common";

import {HasErrorOptions} from "../directives/hasError/hasError.directive";

/**
 * Injection token for hasError default messages
 */
export const HAS_ERROR_DEFAULT_MESSAGES: InjectionToken<StringDictionary> = new InjectionToken<StringDictionary>('HAS_ERROR_DEFAULT_MESSAGES');

/**
 * Injection token for 'HasErrorOptions'
 */
export const HAS_ERROR_OPTIONS: InjectionToken<HasErrorOptions> = new InjectionToken<HasErrorOptions>('HAS_ERROR_OPTIONS');