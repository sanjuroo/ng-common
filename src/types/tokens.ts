import {InjectionToken} from '@angular/core';

/**
 * Base url used during SSR when using HTTP (example: http://localhost:8888/)
 */
export const SERVER_BASE_URL: InjectionToken<string> = new InjectionToken<string>('serverBaseUrl');