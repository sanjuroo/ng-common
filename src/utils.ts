import {TemplateRef, ViewContainerRef, EmbeddedViewRef} from 'angular2/core';
import ViewTemplate from './utils.viewTemplate';

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
}

export default Utils; 