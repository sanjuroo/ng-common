
/**
 * Common utility methods
 */
export default class Common
{
    //######################### public methods #########################
    
    /**
     * Reverse current string and returns new reverse string
     * @param  {string} str String to be reversed
     * @returns string Reverse string
     */
    public static reverseString(str: string): string
    {
        return str.split("").reverse().join("");
    }
    
     /**
     * Extends one object with additional properties from second object
     * @param  {Object} extendedObject Object to be extended
     * @param  {Object} extendingObject Object that will be used for extending
     * @returns Object Extended extendedObject with properties from extendingObject
     */
    public static extend(extendedObject: Object, extendingObject: Object): Object
    {
        for (var attrname in extendingObject) 
        { 
            extendedObject[attrname] = extendingObject[attrname]; 
        }
        
        return extendedObject;
    }
    
    /**
     * Merges properties of two separate object into new third one
     * @param  {Object} source1 First source object 
     * @param  {Object} source2 Second source object
     * @returns Object Object containing properties from source1 and source2 objects
     */
    public static merge(source1: Object, source2: Object): Object
    {
        var resultObj = {};
        
        for (var attrname in source1) 
        { 
            resultObj[attrname] = source1[attrname]; 
        }
        
        for (var attrname in source2) 
        { 
            resultObj[attrname] = source2[attrname]; 
        }
        
        return resultObj;
    }
    
    /**
     * Generates random string consisting from lowercase letters
     * @param  {number} length Length of generated string
     * @returns number Generated string
     */
    public static generateId(length: number)
    {
        var result = "";
        
        for(var x = 0; x < length; x++)
        {
            result += String.fromCharCode(Math.round(Math.random() * 25 + 97));
        }
        
        return result;
    }
}