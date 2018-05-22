import {Optional, Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ProgressIndicatorOptions} from './progressIndicatorOptions';
import {Observable, Subject} from 'rxjs';

/**
 * Service that is used for displaying and hiding progress indicator
 */
@Injectable({providedIn: 'root'})
export class ProgressIndicatorService
{
    //######################### private fields #########################

    /**
     * Indication that current code is running in browser
     */
    private _isBrowser: boolean = false;

    /**
     * Id of running timeout
     */
    private _timeout: any;

    /**
     * Number of running requests
     */
    private _runningRequests: number = 0;

    /**
     * Used for invoking event runningChanged
     */
    private _runningChanged: Subject<boolean> = new Subject<boolean>();

    //######################### public properties #########################

    /**
     * Indication that progress indicator is running
     */
    public running: boolean = false;

    /**
     * Occurs when 'running' changes
     */
    public get runningChanged(): Observable<boolean>
    {
        return this._runningChanged.asObservable();
    }

    //######################### constructors #########################
    constructor(@Inject(PLATFORM_ID) platformId: Object,
                @Optional() public config?: ProgressIndicatorOptions)
    {
        this._isBrowser = isPlatformBrowser(platformId);

        if(config && !(config instanceof ProgressIndicatorOptions))
        {
            this.config = undefined;
            console.warn("Provided configuration for 'ProgressIndicatorService' is not of type 'ProgressIndicatorOptions' and will be ignored!");
        }

        this.config = config || new ProgressIndicatorOptions();
    }

    //######################### public methods #########################

    /**
     * Displays progress indicator after short delay
     */
    public showProgress()
    {
        if(!this._isBrowser)
        {
            return;
        }

        if(!this._timeout && this._runningRequests < 1)
        {
            this._timeout = setTimeout(() =>
            {
                this._onRunning(true);

                clearTimeout(this._timeout);
                this._timeout = null;
            }, this.config.timeout);
        }

        this._runningRequests++;
    }

    /**
     * Hides progress indicator
     * @param {boolean} force Indication that indicator should be hidden even if some processes are running
     */
    public hideProgress(force?: boolean)
    {
        if(!this._isBrowser)
        {
            return;
        }

        if(force)
        {
            this._runningRequests = 0;
        }

        if(this._runningRequests > 0)
        {
            this._runningRequests--;
        }

        if(this._runningRequests < 1)
        {
            clearTimeout(this._timeout);
            this._timeout = null;
            this._onRunning(false);
        }
    }

    //######################### private methods #########################

    /**
     * Used for invoking 'runningChanged' event
     */
    private _onRunning(value: boolean)
    {
        this.running = value;
        this._runningChanged.next(value);
    }
}
