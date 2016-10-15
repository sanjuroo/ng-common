/**
 * Indicates that property value is stored during webpack HMR 
 */
export function HmrData()
{
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor)
    {
        return descriptor;
    }
};