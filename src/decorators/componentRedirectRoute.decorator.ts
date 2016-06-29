import {Route} from '@angular/router';
import {RouteDecoratedComponent} from './componentRoute.decorator';
import {isBlank} from '@angular/core/src/facade/lang';

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
 * @returns ClassDecorator
 */
export function ComponentRedirectRoute(redirectFrom: string): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        let routeDecoratedComponent: RouteDecoratedComponent = <any>target;

        if(isBlank(routeDecoratedComponent))
        {
            console.warn("You can`t use ComponentRedirectRoute earlier than ComponentRoute!");

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

        redirectRouteDecoratedComponent.redirectRouteValues.push(
        {
            terminal: true,
            path: redirectFrom,
            redirectTo: routeDecoratedComponent.routeValue.path
        });

        return target;
    };
}
