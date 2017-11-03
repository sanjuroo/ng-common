import {PlatformRef} from '@angular/core';

/**
 * Enables Webpack Hot Module Replacement, call this at application entry file
 * @param  {PlatformRef} platform Platform used for bootstraping main module
 */
export function hmrAccept(platform: PlatformRef)
{
    console.log(platform);
}

/**
 * Enables displaying of notification when HMR finished work
 */
export function hmrFinishedNotification()
{
}