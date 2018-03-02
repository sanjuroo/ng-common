import {Injectable, Type} from "@angular/core";

/**
 * Service used for disabling specific http client interceptor for one call, if you add interceptor you want to disable before call it will be disabled
 */
@Injectable()
export class IgnoredInterceptorsService
{
    //######################### private fields #########################

    /**
     * Array of interceptors that will be ignored
     */
    private _ignoredInterceptors: {type: Type<any>, url: string}[] = [];

    //######################### public methods #########################

    /**
     * Clears all ignored interceptors from service
     */
    public clear(): void
    {
        this._ignoredInterceptors = [];
    }

    /**
     * Adds interceptor type that should be ignored for specified url
     * @param {Type<TType>} interceptorType Type of interceptor should be ignored
     * @param {string} url Url of request
     */
    public addInterceptor<TType>(interceptorType: Type<TType>, url: string): void
    {
        if(!this._ignoredInterceptors.find(itm => itm.type == interceptorType && itm.url == url))
        {
            this._ignoredInterceptors.push(
            {
                type: interceptorType,
                url: url
            });
        }
    }

    /**
     * Checks specified interceptor whether is ingored
     * @param {Type<TType>} interceptorType Type of interceptor that is checked whether is ignored
     * @param {string} url Url of request
     */
    public isIgnored<TType>(interceptorType: Type<TType>, url: string): boolean
    {
        let item = this._ignoredInterceptors.find(itm => new RegExp(`${itm.url}$`).test(url) && itm.type == interceptorType);

        if(item)
        {
            this._ignoredInterceptors.splice(this._ignoredInterceptors.indexOf(item), 1);

            return true;
        }

        return false;
    }
}