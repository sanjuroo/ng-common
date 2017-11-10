/**
 * Indicates that property value is stored during webpack HMR 
 */
export function HmrData()
{
    return function(_target: any, _propertyKey: string)
    {
    }
};