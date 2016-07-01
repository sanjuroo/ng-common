import {trigger, transition, animate, style, AnimationEntryMetadata} from '@angular/core';
import {InAnimationsConfig} from '../inOutAnimationsConfig';

/**
 * Creates configured FlyInAnimation
 * @param {InAnimationsConfig} configuration Configuration object used for configuring animation
 * @returns AnimationEntryMetadata
 */
export function flyInAnimationConfig(configuration: InAnimationsConfig): AnimationEntryMetadata
{
    return trigger('flyIn',
    [
        transition('void => *',
        [
            style(
            {
                opacity: 0,
                transform: "translateX(18%)"
            }),
            animate(configuration.inTiming)
        ])
    ]);
};

/**
 * Default FlyInAnimation
 */
export const FlyInAnimation = flyInAnimationConfig(
{
    inTiming: '400ms 50ms ease-in'
});
