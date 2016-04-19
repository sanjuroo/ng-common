import {Injectable} from 'angular2/core';
import {DataRouter} from './dataRouter';

/**
 * Class that is used for obtaining complex routed data
 */
@Injectable()
export class DataRouterData
{
    //######################### public properties #########################
    
    /**
     * Value of DataRouter for currently routed page
     */
    public value: Promise<any>;
    
    //######################### constructors #########################
    constructor(dataRouter: DataRouter)
    {
        this.value = dataRouter.valuePromise;
    }
}
