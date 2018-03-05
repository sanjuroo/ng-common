# Changelog

## Version 4.0.15

- `ProgressInterceptor` moved from `@anglr/http-extensions` to this project
- `ProgressInterceptor` can be ignored using `IgnoredInterceptorsService`

## Version 4.0.14

- `requestId` is made optional

## Version 4.0.13

- updated `ProgressIndicatorService` supports force hiding of progress indicator
- updated `IgnoredInterceptorsService` now using requestId for proper identification of request

## Version 4.0.12

- removed `HTTP_CLIENT_IGNORE_INTERCEPTOR`
- now using directly `IgnoredInterceptorsService` for providing `IgnoredInterceptorsService`

## Version 4.0.11

- properly provided `IgnoredInterceptorsService` as `HTTP_CLIENT_IGNORE_INTERCEPTOR`

## Version 4.0.10

- added forgotten export of `HTTP_CLIENT_IGNORE_INTERCEPTOR`

## Version 4.0.9

- added injection token `HTTP_CLIENT_IGNORE_INTERCEPTOR` for injecting `IgnoredInterceptorsService`
- added `IgnoredInterceptorsService` which allows user to disable specified http client interceptors

## Version 4.0.8

- `APP_STABLE` changed to `InjectionToken` and injecting it returns `Promise<void>`

## Version 4.0.7

- updated all validators for number `NumberInputValidatorDirective`, `MinValueNumberValidatorDirective`, `MaxValueNumberValidatorDirective`, now support null value
- all number validatos are now available for Reactive Forms using `Validators` class

## Version 4.0.6

- updated `CommonModule`, `StatusCodeService` is now included only for *browser* versions of `forRoot` methods

## Version 4.0.5

- fixed decorators removed console logs

## Version 4.0.4

- returned typescript version back to 2.4.2 and removed distJit
 
## Version 4.0.3

- changed order of constructor parameters for ProgressIndicatorService

## Version 4.0.2

- added compiled outputs for Angular JIT

## Version 4.0.1

- fixed rxjs operators, now using pipe

## Version 4.0.0

- updated angular to 5.0.0 (final)
- changed dependencies of project to peerDependencies
- more strict compilation
- updated usage of rxjs, now using operators

## Version 4.0.0-beta.0

- updated angular to >=5.0.0-rc.7