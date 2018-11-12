import {NgForm, FormGroup} from '@angular/forms';
import {NgModuleRef} from '@angular/core';
import {Route} from '@angular/router';

import RouterHelper from './utils.routerHelper';
import Common from './utils.common';
import Forms from './utils.forms';

/**
 * Helper methods for angular2 router
 */
export interface IRouterHelper
{
    /**
     * Extracts route definitions from components if routes are set using decorator ComponentRoute
     * @param  {any[]} components Array of components to be used for extraction
     * @returns RouteDefinition Extracted routes
     */
    extractRoutes(components: any[]): Route[];
}

/**
 * Common utility methods
 */
export interface ICommon
{
    /**
     * Runs callback function when angular module is bootstrapped and stable
     * @param {Promise<NgModuleRef<{}>>} moduleRefPromise Promise for module that was bootstrapped
     * @param {(moduleRef: NgModuleRef<{}>) => void} callback Callback that is called
     * @param {boolean} angularProfiler Indication that angular profiler should be enabled
     */
    runWhenModuleStable(moduleRefPromise: Promise<NgModuleRef<{}>>, callback: (moduleRef: NgModuleRef<{}>) => void, angularProfiler?: boolean): void;
}

/**
 * Utility methods form angular 2 forms
 */
export interface IForms
{
    /**
     * Gets indication whether controls have errors, with custom indication of submitted
     * @param  {NgForm|FormGroup} form Form containing controls
     * @param  {string[]} controls Array of controls names to be checked for errors
     * @param  {boolean} submitted Indication whether form was submitted, defaults to false
     */
    hasErrorCustom(form: NgForm|FormGroup, controls: string[], submitted?: boolean): boolean;

    /**
     * Gets indication whether hide alerts or not for control, with custom indication of submitted
     * @param  {NgForm|FormGroup} form Form containing controls
     * @param  {string} control Controls name that will be checked
     * @param  {string[]} errors Array of validation errors to be checked for existance
     * @param  {boolean} submitted Indication whether form was submitted, defaults to false
     */
    alertHiddenCustom(form: NgForm|FormGroup, control: string, errors?: string[], submitted?: boolean): boolean;

    /**
     * Gets indication whether controls have errors
     * @param  {NgForm} form Form containing controls
     * @param  {string[]} controls Array of controls names to be checked for errors
     */
    hasError(form: NgForm, controls: string[]): boolean;


    /**
     * Gets indication whether hide alerts or not for control
     * @param  {NgForm} form Form containing controls
     * @param  {string} control Controls name that will be checked
     * @param  {string[]} errors Array of validation errors to be checked for existance
     */
    alertHidden(form: NgForm, control: string, errors: string[]): void;
}

/**
 * Utils methods categories
 */
class Utils
{
    /**
     * Angular 2 router helper
     */
    static get routerHelper(): IRouterHelper
    {
        return RouterHelper;
    }
    
    /**
     * Common utility methods
     */
    static get common(): ICommon
    {
        return Common;
    }
    
    /**
     * Utility methods form angular 2 forms
     */
    static get forms(): IForms
    {
        return Forms;
    }
}

export {Utils};