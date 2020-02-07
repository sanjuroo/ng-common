/**
 * Transforms property to text
 * @param property - Property to be transformed to text
 */
export function toText(property: any): string 
{
    if (typeof property === 'undefined') 
    {
        return 'undefined';
    }

    if (property === null) 
    {
        return 'null';
    }

    if (typeof property === 'string') 
    {
        return property;
    }

    if (typeof property === 'number') 
    {
        return property.toString();
    }

    if (typeof property === 'boolean') 
    {
        return property.toString();
    }

    if (typeof property.toISOString === 'function') 
    {
        return property.toISOString();
    }

    if (typeof property === 'object') 
    {
        let s = JSON.stringify(property, null, 4);

        return s;
    }

    return property.toString();
};