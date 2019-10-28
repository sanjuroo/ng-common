import {Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";

import {CONSOLE_COMPONENT_SINK_SERVICE} from "../../types/tokens";
import {ConsoleComponentSink, ConsoleComponentLog} from "../../types/logger.interface";

/**
 * Component used for displaying console logs
 */
@Component(
{
    selector: 'console',
    templateUrl: 'console.component.html',
    styleUrls: ['console.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleComponent implements OnInit, OnDestroy
{
    //######################### private fields #########################

    /**
     * Subscription for log changes
     */
    private _logsChangeSubscription: Subscription;

    //######################### public properties - template bindings #########################

    /**
     * Current state of logger
     */
    public currentLogs: ConsoleComponentLog[] = [];

    /**
     * Indication whether can use copy to clipboard
     */
    public canCopy = navigator && navigator.clipboard;

    //######################### constructor #########################
    constructor(@Inject(CONSOLE_COMPONENT_SINK_SERVICE) private _consoleSvc: ConsoleComponentSink,
                private _changeDetector: ChangeDetectorRef)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit()
    {
        this.currentLogs = this._consoleSvc.logs;
        
        this._logsChangeSubscription = this._consoleSvc.logsChange.subscribe(() =>
        {
            this.currentLogs = this._consoleSvc.logs;
            this._changeDetector.detectChanges();
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._logsChangeSubscription)
        {
            this._logsChangeSubscription.unsubscribe();
            this._logsChangeSubscription = null;
        }
    }

    //######################### public methods - template bindings #########################

    /**
     * Copies content of whole console log into clipboard
     */
    public copy()
    {
        if(!navigator || !navigator.clipboard)
        {
            return;
        }

        navigator.clipboard.writeText(this.currentLogs.map(log => log.text).join('\n'));
    }

    /**
     * Clears existing logs
     */
    public clear()
    {
        this._consoleSvc.clear();
    }
}