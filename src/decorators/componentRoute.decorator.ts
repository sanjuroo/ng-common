import {RouteDefinition} from '@angular/router-deprecated';

/**
 * Extended type with route definition
 */
export interface RouteDecoratedComponent
{
    /**
     * Definition of route that is assigned to this type
     */
    routeDefinitionValue: RouteDefinition;
}

/**
 * Defines route for component on which is this decorator applied
 * @param  {RouteDefinition} routeDefinition Definition of route, does not require component to be set
 * @returns ClassDecorator
 */
export function ComponentRoute(routeDefinition: RouteDefinition): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        routeDefinition.component = target;
        
        Object.defineProperty(target, 
                              'routeDefinitionValue', 
                              {
                                  enumerable: true,
                                  configurable: false,
                                  writable: false,
                                  value: routeDefinition
                              });
        
        return target;
    };
}