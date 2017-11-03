import {NgModuleRef, ApplicationRef} from "@angular/core";
import {enableDebugTools} from '@angular/platform-browser';
import * as extend from 'extend';

/**
 * Resolve method for promise APP_STABLE
 */
let resolveAsStable: () => void;

/**
 * Promise that is resoved when application is stable first time if using Utils.common.runWhenModuleStable method
 */
export const APP_STABLE: Promise<any> = new Promise<any>(resolve => resolveAsStable = resolve);

/**
 * Common utility methods
 */
export default class Common
{
    //######################### public methods #########################
    
    /**
     * Reverse current string and returns new reverse string
     * @param  {string} str String to be reversed
     * @returns string Reverse string
     */
    public static reverseString(str: string): string
    {
        return str.split("").reverse().join("");
    }
    
     /**
     * Extends one object with additional properties from other objects, supports deep extend
     * @param  {boolean|Object} deepOrObject Object to be extended or indication that deep copy should be performed
     * @param  {Object[]} objectN Objects that will be used for extending, if deep is used first here is target object
     * @returns Object Extended object with properties from other objects
     */
    public static extend(deepOrObject: boolean | Object, ...objectN: Object[]): Object
    {
        return extend.apply(null, [deepOrObject, ...objectN]);
    }
    
    /**
     * Merges properties of two separate object into new third one
     * @param  {{[key: string]: any}} source1 First source object 
     * @param  {{[key: string]: any}} source2 Second source object
     * @returns Object Object containing properties from source1 and source2 objects
     */
    public static merge(source1: {[key: string]: any}, source2: {[key: string]: any}): Object
    {
        var resultObj: {[key: string]: any} = {};
        
        for (var attrname in source1) 
        { 
            resultObj[attrname] = source1[attrname]; 
        }
        
        for (var attrname in source2) 
        { 
            resultObj[attrname] = source2[attrname]; 
        }
        
        return resultObj;
    }
    
    /**
     * Generates random string consisting from lowercase letters
     * @param  {number} length Length of generated string
     * @returns number Generated string
     */
    public static generateId(length: number)
    {
        var result = "";
        
        for(var x = 0; x < length; x++)
        {
            result += String.fromCharCode(Math.round(Math.random() * 25 + 97));
        }
        
        return result;
    }

    /**
     * Converts string in that way that first letter will be lowerCase
     * @param  {string} text Text to be converted
     */
    public static firstToLowerCase(text: string)
    {
        return text.charAt(0).toLowerCase() + text.substr(1);
    }

    /**
     * Runs callback function when angular module is bootstrapped and stable
     * @param {Promise<NgModuleRef<{}>>} moduleRefPromise Promise for module that was bootstrapped
     * @param {(moduleRef: NgModuleRef<{}>) => void} callback Callback that is called
     * @param {boolean} angularProfiler Indication that angular profiler should be enabled
     */
    public static runWhenModuleStable(moduleRefPromise: Promise<NgModuleRef<{}>>, callback: (moduleRef: NgModuleRef<{}>) => void, angularProfiler?: boolean): void
    {
        angularProfiler = angularProfiler || false;

        moduleRefPromise.then((moduleRef: NgModuleRef<{}>) => 
        {
            const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);

            appRef.isStable
                .filter((isStable: boolean) => isStable)
                .first()
                .subscribe(() => 
                {
                    if(angularProfiler)
                    {
                        enableDebugTools(appRef.components[0]);
                    }

                    callback(moduleRef)
                    resolveAsStable();
                });
        });
    }
}