import {AbstractControl, NgForm, FormGroupDirective} from '@angular/forms';
import {Type} from '@angular/core';
import {Route} from '@angular/router';
import ViewTemplate from './utils.viewTemplate';
import Encoder from './utils.encoder';
import RouterHelper from './utils.routerHelper';
import Common from './utils.common';
import Cookies from './utils.cookies';
import Forms from './utils.forms';

/**
 * View template manipulation methods
 */
export interface IViewTemplate
{
    /**
     * Compiles template into component for dynamic use
     * @param  {string} template Template string that will be compiled
     * @param  {any} data Data object passed to template
     * @returns Function Component that can be inserted into html
     */
    compileToComponent(template: string, data?: any): Function;
}

/**
 * Used for encoding/decoding strings
 */
export interface IEncoder
{
    /**
     * Decode html encoded string
     * @param  {string} input String to be decoded
     * @return string
     */
    htmlDecode(input: string): string;


    /**
     * Encodes html plain string
     * @param  {string} input String to be encoded
     * @param  {boolean} dbl Indication that double encoding should be performed
     * @returns string
     */
    htmlEncode(input:string, dbl?: boolean): string;
}

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

    /**
     * Extracts types of components from routes 
     * @param  {Route[]} routes Array of routes provided for app
     * @param  {boolean=true} recursive Indication whether include to result also components of children routes
     * @returns Type[]
     */
    extractComponents(routes: Route[], recursive?: boolean) : Type<any>[]
}

/**
 * Common utility methods
 */
export interface ICommon
{
    /**
     * Reverse current string and returns new reverse string
     * @param  {string} str String to be reversed
     * @returns string Reverse string
     */
    reverseString(str: string): string;
    
    /**
     * Extends one object with additional properties from second object
     * @param  {Object} extendedObject Object to be extended
     * @param  {Object} extendingObject Object that will be used for extending
     * @returns Object Extended extendedObject with properties from extendingObject
     */
    extend(extendedObject: Object, extendingObject: Object): Object;
    
    /**
     * Merges properties of two separate object into new third one
     * @param  {Object} source1 First source object 
     * @param  {Object} source2 Second source object
     * @returns Object Object containing properties from source1 and source2 objects
     */
    merge(source1: Object, source2: Object): Object;
    
    /**
     * Generates random string consisting from lowercase letters
     * @param  {number} length Length of generated string
     * @returns number Generated string
     */
    generateId(length: number);

    /**
     * Converts string in that way that first letter will be lowerCase
     * @param  {string} text Text to be converted
     */
    firstToLowerCase(text: string)
}

/**
 * Class Cookie - functions to deal with Cookies
 */
export interface ICookies
{
    /**
     * Retrieves a single cookie by it's name
     *
     * @param  {string} name Identification of the Cookie
     * @returns The Cookie's value
     */
    getCookie(name: string): any;
    
    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {any} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    setCookie(name: string, value: any, expires?: number, path?: string, domain?: string);
    
    /**
     * Removes specified Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    deleteCookie(name: string, path ? : string, domain ? : string);
}

/**
 * Utility methods form angular 2 forms
 */
export interface IForms
{
    /**
     * Sets all controls state to pristine
     * @param  {{[controlName:string]:AbstractControl} | AbstractControl[]} controls Array of controls that are going to be set
     */
    setPristine(controls: {[controlName: string]: AbstractControl} | AbstractControl[]): void;

    /**
     * Clears flag indicating that form was submitted
     * @param  {NgForm|FormGroupDirective} form Form which flag should be cleared
     */
    clearSubmitted(form: NgForm | FormGroupDirective): void;

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
     * View template manipulation methods
     */
    static get viewTemplate(): IViewTemplate
    {
        return ViewTemplate;
    }

    /**
     * Encoder of strings
     */
    static get encoder(): IEncoder
    {
        return new Encoder();
    }
    
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
     * Class Cookie - functions to deal with Cookies
     */
    static get cookies(): ICookies
    {
        return Cookies;
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