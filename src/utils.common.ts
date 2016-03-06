
/**
 * Common utility methods
 */
export default class Common
{
    //######################### public methods #########################
    
     /**
     * Extends one object with additional properties from second object
     * @param  {Object} extendedObject Object to be extended
     * @param  {Object} extendingObject Object that will be used for extending
     * @returns Object Extended extendedObject with properties from extendingObject
     */
    static extend(extendedObject: Object, extendingObject: Object): Object
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
    static merge(source1: Object, source2: Object): Object
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
}