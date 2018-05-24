import {NgModuleRef, ApplicationRef, InjectionToken} from "@angular/core";
import {enableDebugTools} from '@angular/platform-browser';
import {filter, first} from 'rxjs/operators';
import * as extend from 'extend';

/**
 * Method used for extraction of resolve method for promise
 * @param {Promise<void>} appStablePromise Promise which contains resolve method that is going to be extracted
 */
export function extractAppStableResolve(appStablePromise: Promise<void>): () => void
{
    return (appStablePromise as any).__resolve;
}

/**
 * Factory used for creating APP_STABLE promise
 */
export function appStablePromiseFactory()
{
    let appStableResolve;
    let appStablePromise = new Promise<void>(resolve => appStableResolve = resolve);

    (appStablePromise as any).__resolve = appStableResolve;

    return appStablePromise;
}

/**
 * Injection token used for obtaining promise that is resolved when application is first time stable
 */
export const APP_STABLE: InjectionToken<Promise<void>> = new InjectionToken<Promise<void>>("APP_STABLE", {providedIn: 'root', factory: appStablePromiseFactory});

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
                .pipe(filter((isStable: boolean) => isStable),
                      first())
                .subscribe(() => 
                {
                    let appStablePromise = moduleRef.injector.get(APP_STABLE);

                    if(angularProfiler)
                    {
                        enableDebugTools(appRef.components[0]);
                    }

                    callback(moduleRef)

                    if(appStablePromise)
                    {
                        let resolveAsStable = extractAppStableResolve(appStablePromise);

                        resolveAsStable();
                    }
                });
        });
    }
}