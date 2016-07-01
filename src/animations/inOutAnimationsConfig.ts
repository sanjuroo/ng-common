/**
 * Configuration that is used for InOutAnimations
 */
export interface InOutAnimationsConfig
{
    /**
     * Definition of timing for in animations, could be number in ms, or timing string
     */
    inTiming: string | number;

    /**
     * Definition of timing for out animations, could be number in ms, or timing string
     */
    outTiming: string | number; 
}