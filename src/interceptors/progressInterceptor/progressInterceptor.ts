import {Injectable, ClassProvider, Optional} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpEventType, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

import {ProgressIndicatorService} from '../../components/progressIndicator/progressIndicator.service';
import {IgnoredInterceptorsService, HttpRequestIgnoredInterceptorId} from '../../services/ignoredInterceptors/ignoredInterceptors.service';

/**
 * ProgressInterceptor used for intercepting http requests and displaying progress indicatior
 */
@Injectable()
export class ProgressInterceptor implements HttpInterceptor
{
    //######################### constructors #########################
    constructor(private _indicatorSvc: ProgressIndicatorService,
                @Optional() private _ignoredInterceptorsService?: IgnoredInterceptorsService)
    {
    }

    //######################### public methods - implementation of HttpInterceptor #########################

    /**
     * Intercepts http request
     * @param {HttpRequestIgnoredInterceptorId<any>} req Request to be intercepted
     * @param {HttpHandler} next Next middleware that can be called for next processing
     */
    public intercept(req: HttpRequestIgnoredInterceptorId<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req)
            .pipe(tap(event =>
            {
                if (this._ignoredInterceptorsService && this._ignoredInterceptorsService.isIgnored(ProgressInterceptor, req))
                {
                    return;
                }

                //request started
                if(event.type == HttpEventType.Sent)
                {
                    this._indicatorSvc.showProgress();
                }
                //response received
                else if(event.type == HttpEventType.Response)
                {
                    this._indicatorSvc.hideProgress();
                }
            }, () => this._indicatorSvc.hideProgress()));
    }
}

/**
 * Progress interceptor provider
 */
export const PROGRESS_INTERCEPTOR_PROVIDER: ClassProvider = 
{
    provide: HTTP_INTERCEPTORS, 
    useClass: ProgressInterceptor, 
    multi: true
};