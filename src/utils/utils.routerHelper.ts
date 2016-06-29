import {RouteDecoratedComponent} from '../decorators/componentRoute.decorator';
import {RedirectRouteDecoratedComponent} from '../decorators/componentRedirectRoute.decorator';
import {Route} from '@angular/router';
import {isPresent} from '@angular/core/src/facade/lang';

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
}