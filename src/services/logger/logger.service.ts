import {Logger} from './logger.interface';

/**
 * Dummy service used as default logger interface doing nothing
 */
export class DummyLoggerService implements Logger
{
    //######################### public methods #########################

    /**
     * Logs an event with the {LogEventLevel.fatal} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    fatal(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the {LogEventLevel.fatal} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    fatal(error: Error, messageTemplate: string, ...properties: any[]);

    fatal(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the {LogEventLevel.error} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    error(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the {LogEventLevel.error} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    error(error: Error, messageTemplate: string, ...properties: any[]);

    error(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the {LogEventLevel.warning} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    warn(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the {LogEventLevel.warning} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    warn(error: Error, messageTemplate: string, ...properties: any[]);

    warn(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the {LogEventLevel.information} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    info(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the {LogEventLevel.information} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    info(error: Error, messageTemplate: string, ...properties: any[]);

    info(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the {LogEventLevel.debug} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    debug(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the {LogEventLevel.debug} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    debug(error: Error, messageTemplate: string, ...properties: any[]);

    debug(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
    
    /**
     * Logs an event with the {LogEventLevel.verbose} severity.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    verbose(messageTemplate: string, ...properties: any[]);

    /**
     * Logs an event with the {LogEventLevel.verbose} severity.
     * @param {Error} error Error for the log event.
     * @param {string} messageTemplate Message template for the log event.
     * @param {any[]} properties Properties that can be used to render the message template.
     */
    verbose(error: Error, messageTemplate: string, ...properties: any[]);

    verbose(_errorOrMessageTemplate: any, ..._properties: any[]) 
    {
    }
}