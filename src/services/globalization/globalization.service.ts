import {Observable} from 'rxjs';

/**
 * Globalization service for handling globalization changes
 */
export abstract class GlobalizationService
{
    /**
     * Gets current name of locale, that is used within application
     */
    public abstract get locale(): string;
    
    /**
     * Gets observable that emits when locale changes and change should be applied to application
     */
    public abstract get localeChange(): Observable<void>;
}