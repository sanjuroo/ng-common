import {Directive, ElementRef} from 'angular2/core';

/**
 * Directive that is used for simple html content insertion
 */
@Directive(
{
    selector: '[aceContent]',
    host: 
    {
        "[innerHTML]": "html"
    }
})
export class Content
{
    //######################### public properties #########################
    /**
     * Html that will be displayed inside element with this directive
     */
    html: string = "";
    
    //######################### constructor #########################
    constructor(private _element: ElementRef)
    {
    }
}