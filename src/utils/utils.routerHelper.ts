import {Type} from '@angular/core';
import {Route} from '@angular/router';
import {RouteDecoratedComponent} from '../decorators/componentRoute.decorator';
import {RedirectRouteDecoratedComponent} from '../decorators/componentRedirectRoute.decorator';
import {isPresent, isBlank} from '@angular/core/src/facade/lang';

/**
 * All types of route decorated components
 */
interface RoutesDecoratedComponent extends RouteDecoratedComponent, RedirectRouteDecoratedComponent
{
}

/**
 * Router helper
 */
export default class RouterHelper
{
    //######################### public methods #########################
    
    /**
     * Extracts route definitions from components if routes are set using decorator ComponentRoute
     * @param  {any[]} components Array of components to be used for extraction
     * @returns RouteDefinition Extracted routes
     */
    public static extractRoutes(components: any[]): Route[]
    {
        var result: Route[] = [];
        
        if(!components)
        {
            return result;
        }
        
        components.forEach((component: RoutesDecoratedComponent) =>
        {
            if(isPresent(component.routeValue))
            {
                result.push(component.routeValue);
            }

            if(isPresent(component.redirectRouteValues))
            {
                component.redirectRouteValues.forEach(route =>
                {
                    result.push(route);
                });
            }
        });
        
        return result;
    }
    
    /**
     * Extracts types of components from routes 
     * @param  {Route[]} routes Array of routes provided for app
     * @param  {boolean=true} recursive Indication whether include to result also components of children routes
     * @returns Type[]
     */
    public static extractComponents(routes: Route[], recursive: boolean = true): Type<any>[]
    {
        if(isBlank(routes) || routes.length < 1)
        {
            return [];
        }

        let childrenCompnents = [];

        if(recursive)
        {
            let childrenRoutes = routes.filter(route => isPresent(route.children) && route.children.length > 0);

            childrenRoutes.forEach(route => childrenCompnents = childrenCompnents.concat(RouterHelper.extractComponents(route.children)));
        }

        return routes
            .filter(route => isPresent(route.component))
            .map(route => <Type<any>>route.component)
            .concat(childrenCompnents);
    }
}