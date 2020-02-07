import {Injectable} from "@angular/core";
import {PermanentStorage} from "@anglr/common";
import * as store from 'store';
import * as expirePlugin from 'store/plugins/expire';
import * as moment from 'moment';

/**
 * Implementation of permanent storage using LocalStorage
 */
@Injectable()
export class LocalPermanentStorageService implements PermanentStorage
{
    //######################### constructor #########################

    constructor()
    {
        store.addPlugin(expirePlugin);
    }

    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets value that was stored with 'name' from permanent storage
     * @param name - Name with which was value stored
     */
    public get<TResult>(name: string): TResult
    {
        return store.get(name);
    }

    /**
     * Sets value that will be stored with 'name'e in permanent storage
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     */
    public set(name: string, value: any): void;

    /**
     * Sets value that will be stored with 'name' in permanent storage until expiration date
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     * @param expires - Time when value should expire
     */
    public set(name: string, value: any, expires: moment.Moment): void;

    /**
     * Sets value that will be stored with 'name' in permanent storage until expiration date
     * @param name - Name with which will be value stored
     * @param value - Value to be stored
     * @param expires - Time when value should expire
     */
    public set(name: string, value: any, expires?: moment.Moment): void
    {
        store.set(name, value, expires ? expires.valueOf() : null);
    }

    /**
     * Removes value stored with 'name' from permanent storage
     * @param name - Name of stored value that will be removed
     */
    public remove(name): void
    {
        store.remove(name);
    }
}