import {TemplateRef, ViewContainerRef, ViewRef, Component} from '@angular/core';

export default class ViewTemplate
{
    //######################### public methods #########################

    /**
     * Compiles template into component for dynamic use
     * @param  {string} template Template string that will be compiled
     * @param  {any} data Data object passed to template
     * @returns Function Component that can be inserted into html
     */
    public static compileToComponent(template: string, data: any = null): Function
    {
        @Component(
        {
            selector: 'tmp-fake',
            template: template
        })
        class FakeComponent
        {
            public data: any = data;
        };

        return FakeComponent;
    }
}