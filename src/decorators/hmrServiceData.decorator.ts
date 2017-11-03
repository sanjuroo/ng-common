/**
 * Indicates that property value of service is stored during webpack HMR 
 */
export function HmrServiceData()
{
    return function(target: any, propertyKey: string)
    {
        console.log(target, propertyKey);
    }
};