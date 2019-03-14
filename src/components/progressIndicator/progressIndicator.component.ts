import {Component, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {ProgressIndicatorService} from './progressIndicator.service';

/**
 * Component that is used for displaying progress indicator
 */
@Component(
{
    selector: "progress-indicator",
    templateUrl: 'progressIndicator.component.html',
    styleUrls: ['progressIndicator.component.css']
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
