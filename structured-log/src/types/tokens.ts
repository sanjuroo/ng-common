import {InjectionToken, Provider, ExistingProvider, ClassProvider} from "@angular/core";
import {LOGGER} from "@anglr/common";
import {Sink} from "structured-log";

import {ConsoleComponentSink} from "./logger.interface";
import {ConsoleComponentSinkService} from "../services/consoleComponentSink.service";
import {LoggerService} from "../services/logger.service";

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

/**
 * Provider for logger that is using structured log implementation
 */
export const STRUCTURED_LOG_LOGGER: Provider =
<ClassProvider>
{
    provide: LOGGER,
    useClass: LoggerService
}