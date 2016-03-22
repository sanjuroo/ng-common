import {RouteDecoratedComponent} from './decorators/componentRoute.decorator';
import {RouteDefinition} from 'angular2/router';

export default class RouterHelper
{
    //######################### public methods #########################
    
    /**
     * Extracts route definitions from components if routes are set using decorator ComponentRoute
     * @param  {any[]} components Array of components to be used for extraction
     * @returns RouteDefinition Extracted routes
     */
    public static extractRoutes(components: any[]): RouteDefinition[]
    {
        var result: RouteDefinition[] = [];
        
        if(!components)
        {
            return result;
        }
        
        components.forEach(component =>
        {
            if('routeDefinitionValue' in component)
            {
                result.push((<RouteDecoratedComponent>component).routeDefinitionValue);
            }
        });
        
        return result;
    }
}