import {Pipe, PipeTransform, OnDestroy} from '@angular/core';
import {isBlank} from '@js/common';
import {Subscription} from 'rxjs';
import * as numeral from 'numeral';

import {GlobalizationService} from '../services/globalization/globalization.service';

/**
 * Pipe to transform numbers to regional formatting using numeraljs.
 */
@Pipe({name: 'numeral'})
export class NumeralPipe implements PipeTransform, OnDestroy
{
    //######################### private fields #########################
    
    /**
     * Subscription for globalization changes
     */
    private _globalizationChangeSubscription: Subscription|null;

    //######################### constructors #########################
    constructor(globalizationSvc: GlobalizationService)
    {
        numeral.locale(globalizationSvc.locale);

        this._globalizationChangeSubscription = globalizationSvc
            .localeChange
            .subscribe(() => numeral.locale(globalizationSvc.locale));
    }
 
    //######################### public methods #########################
    
    /**
     * Formats number value as slovak format string
     * @param {number} value Number to format
     * @param {string} format Format string (optional) 
     */   
    public transform(value: number, format: any): string
    {
        if(isBlank(value))
        {
            return "";
        }
        
        if(isNaN(value))
        {
            value = 0;
        }
        
        return numeral(value).format(format);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
        if(this._globalizationChangeSubscription)
        {
            this._globalizationChangeSubscription.unsubscribe();
            this._globalizationChangeSubscription = null;
        }
    }
}

