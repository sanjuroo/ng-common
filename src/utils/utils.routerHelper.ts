import {RouteDecoratedComponent} from '../decorators/componentRoute.decorator';
import {Route} from '@angular/router';

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
        
        components.forEach(component =>
        {
            if('routeValue' in component)
            {
                result.push((<RouteDecoratedComponent>component).routeValue);
            }
        });
        
        return result;
    }
}