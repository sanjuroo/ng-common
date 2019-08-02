import {Injectable} from "@angular/core";
import {PermanentStorage} from "@anglr/common";
import * as store from 'store';

/**
 * Implementation of permanent storage using LocalStorage
 */
@Injectable()
export class LocalPermanentStorageService implements PermanentStorage
{
    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets value that was stored with 'name' from permanent storage
     * @param name Name with which was value stored
     */
    public get<TResult>(name: string): TResult
    {
        return store.get(name);
    }

    /**
     * Sets value that will be stored with 'name'e in permanent storage
     * @param name Name with which will be value stored
     * @param value Value to be stored
     */
    public set(name: string, value: any): void
    {
        store.set(name, value);
    }

    /**
     * Removes value stored with 'name' from permanent storage
     * @param name Name of stored value that will be removed
     */
    public remove(name): void
    {
        store.remove(name);
    }
}