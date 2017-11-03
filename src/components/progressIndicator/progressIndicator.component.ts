import {Component, Input, OnDestroy} from '@angular/core';
import {ProgressIndicatorService} from './progressIndicator.service';
import {Subscription} from 'rxjs/Subscription';

/**
 * Component that is used for displaying progress indicator
 */
@Component(
{
    selector: "progress-indicator",
    template:
   `<div [ngClass]="appliedClass">
        <div></div>
    </div>`,
    styles:
    [`
        .progress-indicator
        {
            -webkit-transition: all 250ms linear;
            -moz-transition: all 250ms linear;
            transition: all 250ms linear;
            background-color: rgba(0, 0, 0, 0.3);
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 23456;
            opacity: 0;
            visibility: hidden;
        }
        .progress-indicator.running
        {
            visibility: visible;
            opacity: 1;
        }
        .progress-indicator.running > div
        {
            border-left: 4px solid #eee;
            border-radius: 25px;
            border-top: 4px solid #eee;
            height: 40px;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            top: 50%;
            width: 40px;
            animation-name: rotate-progress;
            animation-duration: 350ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }

        @keyframes rotate-progress
        {
            from
            {
                transform: rotate(0deg);
            }
            to
            {
                transform: rotate(360deg);
            }
        }
    `]
})
export class ProgressIndicatorComponent implements OnDestroy
{
    //######################### public properties #########################
    
    /**
     * Subscription for changes in ProgressIndicatorService
     */
    private _subscription: Subscription|null;
    
    //######################### public properties - inputs #########################

    /**
     * Applied css classes
     */
    public appliedClass: {[key: string]: boolean} = { "progress-indicator": true };
    
    /**
     * Sets css classes that will be applied to indicator
     */
    @Input()
    public set cssClass(cssClass: string)
    {
        this.appliedClass = {};
        this.appliedClass[cssClass] = true;
    }

    //######################### private properties #########################
    
    /**
     * Sets indication that progress indicator is running
     */
    private set running(running: boolean)
    {
        this.appliedClass["running"] = running;
    };

    //######################### constructor #########################
    constructor(private _service: ProgressIndicatorService)
    {
        this.running = this._service.running;
        this._subscription = this._service.runningChanged.subscribe(running => this.running = running);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._subscription)
        {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
    }
}
