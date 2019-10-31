import {Observable} from "rxjs";

/**
 * Definition of sink that will write to `ConsoleComponent`
 */
export interface ConsoleComponentSink
{
    /**
     * Occurs when logs change
     */
    readonly logsChange: Observable<void>;

    /**
     * Gets current logs
     */
    readonly logs: ConsoleComponentLog[];

    /**
     * Clears all current logs
     */
    clear();
}

/**
 * Definition of logs available for `ConsoleComponent`
 */
export interface ConsoleComponentLog
{
    /**
     * Text of log to be displayed
     */
    text: string;

    /**
     * Log level of log
     */
    logLevel: string;

    /**
     * Indication whether detail of line is expanded or not
     */
    expanded?: boolean;
}