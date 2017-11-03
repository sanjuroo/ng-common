/**
 * Indicates that service class has properties values stored during webpack HMR 
 */
export function HmrServiceDataConstructor()
{
    return function(target: {new(...args:any[]):{}}): any
    {
        console.log(target);
    }
};