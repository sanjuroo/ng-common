import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {isPresent} from '@angular/core/src/facade/lang';

/**
 * Special implementation of router that allows routing with sending complex data to routed component
 */
@Injectable()
export class DataRouter
{
    //######################### private fields #########################

    /**
     * Indication that it is first checking of router data, that means no routing was done
     */
    private _isFirst: boolean = true;

    /**
     * Value that is going to be used for next routed data
     */
    private _nextValue: any = null;

    /**
     * Url path of next route
     */
    private _nextUrlPath: string = null;

    /**
     * Resolver function that is used for resolving routed value
     */
    private _valuePromiseResolver: (data: any) => void;
    
    /**
     * Promise that resolves into value for current route
     */
    private _valuePromise: Promise<any> = null;

    //######################### public properties #########################

    /**
     * Gets promise that resolves into value for current route
     */
    public get valuePromise(): Promise<any>
    {
        if(this._isFirst)
        {
            this._isFirst = false;
            this._valuePromise = new Promise(resolve =>
            {
                this._valuePromiseResolver = resolve;
            });
            
            return new Promise(resolve =>
            {
                resolve(null);
            });
        }
        
        return this._valuePromise;
    }

    //######################### constructor #########################
    constructor(private _router: Router)
    {
        this._router.events.subscribe(next =>
        {
            if(!(next instanceof NavigationEnd))
            {
                return;
            }

            if(isPresent(this._valuePromiseResolver) && isPresent(this._nextUrlPath))
            {
                if(this._nextUrlPath == next.url)
                {
                    this._valuePromiseResolver(this._nextValue);
                }
                else
                {
                    this._valuePromiseResolver(null);
                }
            }
            else if(isPresent(this._valuePromiseResolver))
            {
                this._valuePromiseResolver(null);
            }
            
            this._nextUrlPath = null;
            this._nextValue = null;
            
            this._valuePromise = new Promise(resolve =>
            {
                this._valuePromiseResolver = resolve;
            });
        });
    }

    //######################### public methods #########################

    /**
     * Navigate based on the provided Route Link DSL. This method also allows you to provide complex data for your route
     * @param  {any[]} linkParams Link params that are used as for standard router
     * @param  {any} routeData Any type of object that can be passed to your routed component
     * @returns Promise
     */
    public navigate(linkParams: any[], routeData: any): Promise<any>
    {
        this._nextValue = routeData;
        this._nextUrlPath = this._router.createUrlTree(linkParams).toString();

        return this._router.navigate(linkParams);
    }
}
