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
    private _ignoredInterceptors: Type<any>[] = [];

    //######################### public methods #########################

    /**
     * Clears all ignored interceptors from service
     */
    public clear(): void
    {
        this._ignoredInterceptors = [];
    }

    /**
     * Adds interceptor type that should be ignored
     * @param {Type<TType>} interceptorType Type of interceptor should be ignored
     */
    public addInterceptor<TType>(interceptorType: Type<TType>): void
    {
        if(!this._ignoredInterceptors.find(itm => itm == interceptorType))
        {
            this._ignoredInterceptors.push(interceptorType);
        }
    }

    /**
     * Checks specified interceptor whether is ingored
     * @param {Type<TType>} interceptorType Type of interceptor that is checked whether is ignored
     */
    public isIgnored<TType>(interceptorType: Type<TType>): boolean
    {
        let index = this._ignoredInterceptors.indexOf(interceptorType);

        if(index > -1)
        {
            this._ignoredInterceptors.splice(index, 1);

            return true;
        }

        return false;
    }
}