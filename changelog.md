# Changelog

## Version 7.3.1

- fixed `LocalPermanentStorageService` now correctly stores data indefinitely if `expire` is not provided or it is null

## Version 7.3.0

- added `TemporaryStorage` interface used as api for temporary storage implementation
- added `MemoryTemporaryStorageService` as default implementation of `TemporaryStorage`, using process memory as storage
- added `TEMPORARY_STORAGE` token for injecting `TemporaryStorage` implementation, defaults to `MemoryTemporaryStorageService`

## Version 7.2.0

- added *subpackage* `@anglr/common/material`
- *subpackage* `@anglr/common/material`
   - added `TitledDialogComponent` wrapping `@angular/material/dialog`, adding title
   - added `TitledDialogModule` containing `TitledDialogComponent` and `TitledDialogService`
   - added `TitledDialogService` used for opening *titled dialog*
   - added `TITLED_DIALOG_DATA` token for obtaining passed data inside
- added `DebugDataComponent` used for displaying debug data
- added `DebugDataEnabledService` handling enabled/visibility state of `DebugDataComponent`
- added `DebugDataModule` containing `DebugDataComponent`
- *subpackage* `@anglr/common/structured-log`
   - added `ConsoleSinkConfigService` used for handling configuration for `ConsoleComponentSinkService`

## Version 7.0.1

- *style.scss* is not included in index, have to be custom included during build

## Version 7.1.0

- `LocalizePipe` changed to not `pure`
- added *subpackage* `@anglr/common/positions`
- *subpackage* `@anglr/common/positions`
   - new method `positionsWithFlip` that uses `positions` and flips location if it conflicts with viewport

## Version 7.0.0

- updated to latest stable *Angular* 9
- added generating of API doc

## Version 6.6.5

- added support for extracting routes from *children components* when `ModuleRoutes` is used

## Version 6.6.4

- *style.scss* now correctly included also as part of src

## Version 6.6.3

- *subpackage* `@anglr/common/structured-log`
   - fixed position of *expand/collapse* icon in expanded state for `ConsoleComponent`

## Version 6.6.2

- *subpackage* `@anglr/common/structured-log`
   - added possibility to *expand/collapse* each line in `ConsoleComponent`

## Version 6.6.1

- *subpackage* `@anglr/common/structured-log`
   - added filter to `ConsoleComponent`
   - now each log row can be copied in `ConsoleComponent`
   - styling of `ConsoleComponent` copy and clear is not positioned on top

## Version 6.6.0

- created *subpackage* `@anglr/common/moment` containing all `moment` library dependent code
   - added `MomentConvertPipe` allowing conversion value to `moment`
   - added `MomentFormatPipe` allowing formatting of value using `moment` format function
- created *subpackage* `@anglr/common/structured-log` containing all `structured-log` dependent code
   - added `ConsoleComponent` used for displaying logs from `ConsoleComponentSinkService`
   - added `consoleAnimationTrigger` can be used for animating `ConsoleComponent`
   - added `toText` method allowing displaying whole stringified json
   - added `ConsoleLogModule` containing `ConsoleComponent`, contains also method `forRoot` that allows register `structured-log` as `Logger` (with `CONSOLE_COMPONENT_SINK`)
   - added `ConsoleComponentSinkService` as implementation of `structured-log` sink
   - added `LoggerService` as implementation of `Logger` from `@anglr/common` using `structured-log`
   - added `LOGGER_SINKS` injection token allowing providing multiple sinks for `structured-log` logger
   - added `CONSOLE_COMPONENT_SINK_SERVICE` injection token for injecting implementation of `ConsoleComponentSink`
   - added `CONSOLE_COMPONENT_SINK`, `STRUCTURED_LOG_LOGGER` providers

## Version 6.5.1

 - fixed *AOT* compilation for `ProgressIndicatorModule`

## Version 6.5.0

 - completely refactored *ProgressIndicator*
 - `ProgressIndicatorComponent` now supports displaying *messages*
 - `ProgressIndicatorService` now supports displaying *messages* and also supports displaying progress indicator *groups* (overlays)
 - added `ProgressOverlayDirective` which allows displaying custom progress indicator *groups* on specified html elements
 - added `LOGGER` token for injecting generic `Logger` which allows logging (with default dummy logging)
 - added `IsPresentPipe` which allows checking whether value is different from `null` or `undefined`
 - added `IsNaNPipe` which allows checking whether value is `NaN`
 - added `LocalizePipe` which allows to use `StringLocalization` within angular templates
 - added `UrlEncodePipe` which allows to use `serializeToUrlQuery` within angular templates

## Version 6.4.5

 - `ModuleRoutes` now working with latest Angular 9-next.10+

## Version 6.4.4

 - added support for expiration date into `PermanentStorage`
 - added changeDetection.OnPush for `ProgressIndicator` component

## Version 6.4.3

 - fixed compilation problem with AOT when `HasErrorModule` used in application

## Version 6.4.2

 - fixed errorMessages handling in `hasErrorDirective`
 - added `requriedClassDirective` into `hasErrorModule`

## Version 6.4.1

 - added directives `hasErrorDirective`, `groupHasErrorDirective` and service `SubmittedService` into `@anglr/forms`

## Version 6.4.0

 - added parameter `skipSerialization` to `CookieService` methods `getCookie` and `setCookie` allowing skip *JSON* serialization/deserialization
 - fixed `getCookie` of `CookieService` if no cookies are present
 - added `StringLocalization` with `STRING_LOCALIZATION` token for injecting service that allows localization of strings
 - added default implementation of `StringLocalization` `NoStringLocalizationService` which returns same value as localized key
 - added `PermanentStorage` with `PERMANENT_STORAGE` token for injecting service that allows permanently storing od data
 - added `CookiePermanentStorageService` allowing use session cookies as *permanent* storage
 - created *subpackage* `@anglr/common/store` containing all `store` dependent code (browser LocalStorage)
   - `LocalPermanentStorageService` as implementation of `PermanentStorage` using *LocalStorage*

## Version 5.0.6
 - fixed `getCookie` of `CookieService` if no cookies are present

## Version 5.0.5
 - added parameter `skipSerialization` to `CookieService` methods `getCookie` and `setCookie` allowing skip *JSON* serialization/deserialization

## Version 6.3.0

 - created *subpackage* `@anglr/common/hotkeys` containing all `angular2-hotkeys` library dependent code
   - `AppHotkeysService` added to this subpackage

## Version 6.2.0

 - created *subpackage* `@anglr/common/numeral` containing all `numeral` library dependent code
   - `NumeralPipe` added to this subpackage
   - `NumeralModule` added to this subpackage
 - created *subpackage* `@anglr/common/forms` containing all `@angular/forms` dependent code
   - `MaxValueNumberValidatorDirective` added to this subpackage
   - `MinValueNumberValidatorDirective` added to this subpackage
   - `NumberInputControlValueAccessor` added to this subpackage
   - `NumberInputValidatorDirective` added to this subpackage
   - `Validators` added to this subpackage
   - all *utils* exported as independent functions `hasErrorCustom`, `alertHiddenCustom`, `hasError`, `alertHidden`
 - created *subpackage* `@anglr/common/router` containing all `@angular/router` dependent code
   - `DataRouter` and `DataRouterData` added to this subpackage
   - `ComponentRedirectRoute`, `ComponentRoute`, `ModuleRoutes` added to this subpackage
   - `ModuleRoutesOptions` extended with `ExtraOptions` for `RouterModule.forRoot()`
   - `extractRoutes` added as independent function
 - **BREAKING CHANGES**
   - `NumeralPipe` removed from `CommonModule` and from `@anglr/common`
   - `MaxValueNumberValidatorDirective` removed from `CommonModule` and from `@anglr/common`
   - `MinValueNumberValidatorDirective` removed from `CommonModule` and from `@anglr/common`
   - `NumberInputControlValueAccessor` removed from `CommonModule` and from `@anglr/common`
   - `NumberInputValidatorDirective` removed from `CommonModule` and from `@anglr/common`
   - `Validators` removed from `@anglr/common`
   - `DataRouter` and `DataRouterData` removed from `@anglr/common`
   - `ComponentRedirectRoute`, `ComponentRoute`, `ModuleRoutes` removed from `@anglr/common`
   - removed static class `Utils` and all its parts except `runWhenModuleStable`, `APP_STABLE`, `extractAppStableResolve` which are exported independently

## Version 6.1.0
 
 - created *subpackage* `@anglr/common/hmr` containing new HMR `hmrAccept` and `hmrFinishedNotification`
    - `hmrAccept` and `hmrFinishedNotification` in `@anglr/common/` are deprecated
 - added new decorator `ModuleRoutes` used with Angular IVY for setting routes to module combining with `ComponentRoute` and `ComponentRedirectRoute` decorators

## Version 6.0.0

 - Angular IVY ready (APF compliant package)
 - added support for ES2015 compilation
 - Angular 8
 - moved all common stuff into `@jscrpt/common`
    - removed stuff `Encoder`, `Paginator`, `OrderByDirection`, `Dictionary`, `StringDictionary`, `ValueNamePair`, `reverseString`, `extend`, `merge`, `generateId`, `firstToLowerCase`, `htmlToElement`, `isPresent`, `isBlank`, `isBoolean`, `isNumber`, `isString`, `isFunction`, `isType`, `isStringMap`, `isStrictStringMap`, `isArray`, `isDate`, `noop`, `normalizeBlank`, `isJsObject`, `isPrimitive`, `hasConstructor`, `isEmptyObject`, `nameof`
    - removed also most of `Utils.common`

## Version 5.0.4
 - fixed missing export of `htmlToElement`

## Version 5.0.3
 - added new method `htmlToElement` for conversion html string into html DOM

## Version 5.0.2
 - completely removed `Utils.viewTemplate` method and everything connected with it

## Version 5.0.1
 - fixed `NgComponentOutletEx<TComponent>`, now works with external module

## Version 5.0.0
 - stabilized for angular v6

## Version 5.0.0-beta.3
 - `@anglr/common` is now marked as *sideEffects* free
 - *injection token* `SCROLL_MAGIC_CONTROLLER` removed

## Version 5.0.0-beta.2
 - `ProgressIndicatorService` reworked as *tree-shakeable*
 - removed `forRoot` methods from `ProgressIndicatorModule`, options for `ProgressIndicatorService` must be overriden directly
 - services `StatusCodeService`, `DataRouter`, `IgnoredInterceptorsService`, `CookieService` changed to *tree-shakeable*
 - *InjectionToken* `APP_STABLE` changed to *tree-shakeable*
 - removed `forRoot` methods from `CommonModule`, `GlobalizationService` must be provided directly in root
 - changed `GlobalizationService.getLocale()` to `GlobalizationService.locale` get property
 - changed `GlobalizationService.getLocaleChange()` to `GlobalizationService.localeChange` get property, with `void` value

## Version 5.0.0-beta.1
 - aktualizácia balíčkov `Angular` na `6`
 - aktualizácia `Webpack` na verziu `4`
 - aktualizácia `rxjs` na verziu `6`
 - automatické generovanie dokumentácie

## Version 4.0.16

- fixed `ProgressIndicatorService`, now hiding again properly

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