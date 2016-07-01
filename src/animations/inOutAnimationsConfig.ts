/**
 * Configuration that is used for InAnimations
 */
export interface InAnimationsConfig
{
    /**
     * Definition of timing for in animations, could be number in ms, or timing string
     */
    inTiming: string | number;
}

/**
 * Configuration that is used for OutAnimations
 */
export interface OutAnimationsConfig
{
    /**
     * Definition of timing for out animations, could be number in ms, or timing string
     */
    outTiming: string | number; 
}

/**
 * Configuration that is used for InOutAnimations
 */
export interface InOutAnimationsConfig extends InAnimationsConfig, OutAnimationsConfig
{
}