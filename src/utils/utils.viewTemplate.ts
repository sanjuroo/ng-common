import {TemplateRef, ViewContainerRef, ViewRef, Component} from '@angular/core';
import {isPresent, isBlank} from '@angular/core/src/facade/lang';

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
}