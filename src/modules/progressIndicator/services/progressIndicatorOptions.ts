import {isPresent} from '@jscrpt/common';

/**
 * Configuration object that is used by ProgressIndicatorService, overriding its properties allows you to customize configuration
 */
export class ProgressIndicatorOptions
{
    //######################### public properties #########################
    
    /**
     * Timeout length after which will be progress indication displayed
     */
    public timeout: number = 220;
    
    //######################### constructor #########################
    constructor(timeout?: number)
    {
        if(isPresent(timeout))
        {
            this.timeout = timeout as number;
        }
    }
}