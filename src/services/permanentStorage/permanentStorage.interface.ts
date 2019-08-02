/**
 * Provides api for implementing permanent storage
 */
export interface PermanentStorage
{
    /**
     * Gets value that was stored with 'name' from permanent storage
     * @param name Name with which was value stored
     */
    get<TResult>(name: string): TResult;

    /**
     * Sets value that will be stored with 'name'e in permanent storage
     * @param name Name with which will be value stored
     * @param value Value to be stored
     */
    set(name: string, value: any): void;

    /**
     * Removes value stored with 'name' from permanent storage
     * @param name Name of stored value that will be removed
     */
    remove(name): void;
}