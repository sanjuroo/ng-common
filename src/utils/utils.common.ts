import * as extend from 'extend';

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
     * Extends one object with additional properties from other objects, supports deep extend
     * @param  {boolean|Object} deepOrObject Object to be extended or indication that deep copy should be performed
     * @param  {Object[]} objectN Objects that will be used for extending, if deep is used first here is target object
     * @returns Object Extended object with properties from other objects
     */
    public static extend(deepOrObject: boolean | Object, ...objectN: Object[]): Object
    {
        return extend(deepOrObject, objectN);
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

    /**
     * Converts string in that way that first letter will be lowerCase
     * @param  {string} text Text to be converted
     */
    public static firstToLowerCase(text: string)
    {
        return text.charAt(0).toLowerCase() + text.substr(1);
    }
}