import {InjectionToken} from '@angular/core';

/**
 * Base url used during SSR when using HTTP (example: http://localhost:8888/)
 */
export const SERVER_BASE_URL: InjectionToken<string> = new InjectionToken<string>('serverBaseUrl');

/**
 * Token is used to transfer server cookie header
 */
export const SERVER_COOKIE_HEADER: InjectionToken<string> = new InjectionToken<string>('serverCookieHeader');

/**
 * Token is used to transfer server authentication header
 */
export const SERVER_AUTH_HEADER: InjectionToken<string> = new InjectionToken<string>('serverAuthHeader');

/**
 * Token used for obtaining scrollmagic controller instance
 */
export const SCROLL_MAGIC_CONTROLLER: InjectionToken<ScrollMagic.Controller> = new InjectionToken<ScrollMagic.Controller>("SCROLL_MAGIC_CONTROLLER");