import {Type} from '@angular/core';
import {RouterModule, Route, ExtraOptions} from '@angular/router';

import {extractRoutes} from '../misc/utils';

/**
 * Describes options for ModuleRoutes decorator
 */
export interface ModuleRoutesOptions
{
    /**
     * Indication that `forRoot` should be used during registration of routes
     */
    rootModule?: boolean;

    /**
     * Extra options used for `forRoot` module creation
     */
    rootModuleConfig?: ExtraOptions;

    /**
     * Routes that will be set before routedComponents
     */
    staticRoutesBefore?: Route[];

    /**
     * Routes that will be set after routedComponents
     */
    staticRoutesAfter?: Route[];
}

/**
 * Registers routes for module to which is attached
 * @param routedComponents Array of components that will be used for routes extration
 * @param options Optional options for defining routes
 */
export function ModuleRoutes(routedComponents: Type<any>[], options: ModuleRoutesOptions = {rootModule: false, staticRoutesAfter: [], staticRoutesBefore: []})
{
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        let ngModule: 
        {
            ɵinj:
            {
                imports: any[]
            }
        } = target as any;
        
        if(ngModule.ɵinj && Array.isArray(ngModule.ɵinj.imports))
        {
            let routes = 
            [
                ...options.staticRoutesBefore || [],
                ...extractRoutes(routedComponents),
                ...options.staticRoutesAfter || []
            ];

            ngModule.ɵinj.imports.push(options.rootModule ? RouterModule.forRoot(routes, options.rootModuleConfig) : RouterModule.forChild(routes));
        }

        return target;
    };
}