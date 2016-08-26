import {Observable} from 'rxjs/Observable';

/**
 * Globalization service for handling globalization changes
 */
export abstract class GlobalizationService
{
    /**
     * Gets current name of locale, that is used within application
     */
    public abstract getLocale(): string;
    
    /**
     * Gets observable that emits data when locale changes and change should be applied to application
     */
    public abstract getLocaleChange(): Observable<string>;
}