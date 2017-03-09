import {Optional, Injectable} from '@angular/core';
import {ProgressIndicatorOptions} from './progressIndicatorOptions';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

//TODO - running counter move here

/**
 * Service that is used for displaying and hiding progress indicator
 */
@Injectable()
export class ProgressIndicatorService
{
    //######################### private fields #########################

    /**
     * Id of running timeout
     */
    private _timeout: any;

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
    constructor(@Optional() public config: ProgressIndicatorOptions)
    {
        if(config && !(config instanceof ProgressIndicatorOptions))
        {
            this.config = null;
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
        if(!this._timeout)
        {
            this._timeout = setTimeout(() =>
            {
                this._onRunning(true);

                clearTimeout(this._timeout);
                this._timeout = null;
            }, this.config.timeout);
        }
    }

    /**
     * Hides progress indicator
     */
    public hideProgress()
    {
        clearTimeout(this._timeout);
        this._timeout = null;
        this._onRunning(false);
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
