import {Route} from '@angular/router';
import {RouteDecoratedComponent} from './componentRoute.decorator';
import {isBlank} from '@angular/core/src/facade/lang';
import {isPresent} from '../utils/lang';

/**
 * Extended type with redirect route definition
 */
export interface RedirectRouteDecoratedComponent
{
    /**
     * Definition of redirection routes that are assigned to this type
     */
    redirectRouteValues: Route[];
}

/**
 * Defines redirection route to component`s route on which is this decorator applied
 * @param  {string} redirectFrom Path from which should redirection occur
 * @param  {string} redirectTo Path to which should be redirect performed, if not specified and only one route is defined, its path will be used
 * @param  {boolean} pathMatchFull Indication that full path match should be used, default is true
 * @returns ClassDecorator
 */
export function ComponentRedirectRoute(redirectFrom: string, redirectTo?: string, pathMatchFull?: boolean): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        let routeDecoratedComponent: RouteDecoratedComponent = <any>target;

        if(isBlank(routeDecoratedComponent.routeValues) && isBlank(redirectTo))
        {
            console.warn("Missing 'ComponentRoute' or wrong order of decorators 'ComponentRoute' and 'ComponentRedirectRoute'!");

            return target;
        }

        if(isBlank(redirectTo) && isPresent(routeDecoratedComponent.routeValues) && routeDecoratedComponent.routeValues.length > 1)
        {
            console.warn("Multiple routes defined. Unable to set proper redirect!");

            return target;
        }

        let redirectRouteDecoratedComponent: RedirectRouteDecoratedComponent = <any>target;

        if(isBlank(redirectRouteDecoratedComponent.redirectRouteValues))
        {
            Object.defineProperty(target,
                                  'redirectRouteValues',
                                  {
                                      enumerable: true,
                                      configurable: false,
                                      writable: false,
                                      value: []
                                  });
        }

        if(isBlank(pathMatchFull))
        {
            pathMatchFull = true;
        }

        redirectRouteDecoratedComponent.redirectRouteValues.push(
        {
            path: redirectFrom,
            redirectTo: routeDecoratedComponent.routeValues[0].path,
            pathMatch: pathMatchFull ? "full" : "prefix"
        });

        return target;
    };
}
