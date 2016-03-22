import {TemplateRef, ViewContainerRef, EmbeddedViewRef, Component} from 'angular2/core';
import {isPresent, isBlank} from 'angular2/src/facade/lang';

/**
 * Record view tuple for structural directives
 */
class RecordViewTuple
{
    constructor(public record: any, public view: EmbeddedViewRef)
    {
    }
}

export default class ViewTemplate
{
    //######################### public methods #########################


    /**
     * Compiles template into component for dynamic use
     * @param  {string} template Template string that will be compiled
     * @param  {Function[]} directives Array of directives that are used within template
     * @param  {Function[]} pipes Array of pipes that are used within template
     * @param  {any} data Data object passed to template
     * @returns Function Component that can be inserted into html
     */
    public static compileToComponent(template: string, directives: Function[], pipes: Function[], data: any = null): Function
    {
        @Component(
        {
            selector: 'tmp-fake',
            template: template,
            directives: directives,
            pipes: pipes
        })
        class FakeComponent
        {
            public data: any = data;
        };

        return FakeComponent;
    }

    /**
     * Applies templates changes (addition, moving, removal) in specified viewContainer and calls additional method
     * @param  {any} changes Changes obtained from call of IterableDiffer.diff()
     * @param  {TemplateRef} template Template that is going to be added if new items are in collection
     * @param  {ViewContainerRef} viewContainer View container that is going to be expanded
     * @param  {(view:EmbeddedViewRef,item:any,index:number,count:number)=>void} doForExisting Callback called when new items were added into container and additional operation are required on new views
     */
    public static applyChanges(changes, template: TemplateRef, viewContainer: ViewContainerRef, doForExisting: (view: EmbeddedViewRef, item: any, index: number, count: number) => void)
    {
        var recordViewTuples = [];

        changes.forEachRemovedItem((removedRecord) => recordViewTuples.push(new RecordViewTuple(removedRecord, null)));
        changes.forEachMovedItem((movedRecord) => recordViewTuples.push(new RecordViewTuple(movedRecord, null)));

        var insertTuples = this._bulkRemove(recordViewTuples, viewContainer);

        changes.forEachAddedItem((addedRecord) => insertTuples.push(new RecordViewTuple(addedRecord, null)));

        this._bulkInsert(insertTuples, viewContainer, template);

        for (var i = 0; i < insertTuples.length; i++)
        {
            doForExisting(insertTuples[i].view, insertTuples[i].record, i, insertTuples.length);
        }
    }

    //######################### private methods #########################

    /**
     * Process removed and moved objects
     * @param  {RecordViewTuple[]} tuples List of items that were moved and removed
     * @param  {ViewContainerRef} viewContainer View container containing items that are going to be removed or moved
     * @returns RecordViewTuple Moved items (already detached)
     */
    private static _bulkRemove(tuples: RecordViewTuple[], viewContainer: ViewContainerRef): RecordViewTuple[]
    {
        tuples.sort((a, b) => a.record.previousIndex - b.record.previousIndex);

        var movedTuples = [];

        for (var i = tuples.length - 1; i >= 0; i--)
        {
            var tuple = tuples[i];
            // separate moved views from removed views.
            if (isPresent(tuple.record.currentIndex))
            {
                tuple.view = viewContainer.detach(tuple.record.previousIndex);
                movedTuples.push(tuple);
            }
            else
            {
                viewContainer.remove(tuple.record.previousIndex);
            }
        }

        return movedTuples;
    }

    /**
     * Inserts new and moved items to view container
     * @param  {RecordViewTuple[]} tuples Added and move items to be processed
     * @param  {ViewContainerRef} viewContainer View container that is going to be filled with new or moved items
     * @param  {TemplateRef} template Template that is going to be used for new item
     * @returns RecordViewTuple Array of inserted items with their views
     */
    private static _bulkInsert(tuples: RecordViewTuple[], viewContainer: ViewContainerRef, template: TemplateRef): RecordViewTuple[]
    {
        tuples.sort((a, b) => a.record.currentIndex - b.record.currentIndex);

        for (var i = 0; i < tuples.length; i++)
        {
            var tuple = tuples[i];

            if (isPresent(tuple.view))
            {
                viewContainer.insert(tuple.view, tuple.record.currentIndex);
            }
            else
            {
                tuple.view = viewContainer.createEmbeddedView(template, tuple.record.currentIndex);
            }
        }

        return tuples;
    }
}