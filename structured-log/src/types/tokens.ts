import {InjectionToken, Provider, ExistingProvider} from "@angular/core";
import {Sink} from "structured-log";

import {ConsoleComponentSink} from "./logger.interface";
import {ConsoleComponentSinkService} from "../services/consoleComponentSink.service";

/**
 * Factory method for `ConsoleComponentSink`
 */
export function consoleComponentSinkFactory()
{
    return new ConsoleComponentSinkService();
}

/**
 * Injection token for obtaining loggers sinks
 */
export const LOGGER_SINKS: InjectionToken<Sink[]> = new InjectionToken<Sink[]>('LOGGER_SINK');

/**
 * Injection token for obtaining sink service for `ConsoleComponent`
 */
export const CONSOLE_COMPONENT_SINK_SERVICE: InjectionToken<ConsoleComponentSink> = new InjectionToken<ConsoleComponentSink>('CONSOLE_COMPONENT_SINK_SERVICE', {providedIn: 'root', factory: consoleComponentSinkFactory});

/**
 * Provider for ConsoleComponentSink for logger
 */
export const CONSOLE_COMPONENT_SINK: Provider =
<ExistingProvider>
{
    provide: LOGGER_SINKS,
    useExisting: CONSOLE_COMPONENT_SINK_SERVICE,
    multi: true
};