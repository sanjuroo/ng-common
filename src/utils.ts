import {TemplateRef, ViewContainerRef, EmbeddedViewRef} from 'angular2/core';
import {RouteDefinition} from 'angular2/router';
import ViewTemplate from './utils.viewTemplate';
import Encoder from './utils.encoder';
import RouterHelper from './utils.routerHelper';

/**
 * View template manipulation methods
 */
export interface IViewTemplate
{
    /**
     * Applies templates changes (addition, moving, removal) in specified viewContainer and calls additional method
     * @param  {any} changes Changes obtained from call of IterableDiffer.diff()
     * @param  {TemplateRef} template Template that is going to be added if new items are in collection
     * @param  {ViewContainerRef} viewContainer View container that is going to be expanded
     * @param  {(view:EmbeddedViewRef,item:any,index:number,count:number)=>void} doForExisting Callback called when new items were added into container and additional operation are required on new views
     */
    applyChanges(changes, template: TemplateRef, viewContainer: ViewContainerRef, doForExisting: (view: EmbeddedViewRef, item: any, index: number, count: number) => void): void;

    /**
     * Compiles template into component for dynamic use
     * @param  {string} template Template string that will be compiled
     * @param  {any[]} directives Array of directives that are used within template
     * @returns Function Component that can be inserted into html
     */
    compileToComponent(template: string, directives: Function[]): Function
}

/**
 * Used for encoding/decoding strings
 */
export interface IEncoder
{
    /**
     * Decode html encoded string
     * @param  {string} input String to be decoded
     * @return string
     */
    htmlDecode(input: string): string;


    /**
     * Encodes html plain string
     * @param  {string} input String to be encoded
     * @param  {boolean} dbl Indication that double encoding should be performed
     * @returns string
     */
    htmlEncode(input:string, dbl?: boolean): string;
}

/**
 * Helper methods for angular2 router
 */
export interface IRouterHelper
{
    /**
     * Extracts route definitions from components if routes are set using decorator ComponentRoute
     * @param  {any[]} components Array of components to be used for extraction
     * @returns RouteDefinition Extracted routes
     */
    extractRoutes(components: any[]): RouteDefinition[];
}

/**
 * Utils methods categories
 */
class Utils
{
    /**
     * View template manipulation methods
     */
    static get viewTemplate(): IViewTemplate
    {
        return ViewTemplate;
    }

    /**
     * Encoder of strings
     */
    static get encoder(): IEncoder
    {
        return new Encoder();
    }
    
    /**
     * Angular 2 router helper
     */
    static get routerHelper(): IRouterHelper
    {
        return RouterHelper;
    }
}

export default Utils;