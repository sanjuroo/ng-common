import {trigger, transition, animate, style, state, AnimationEntryMetadata} from '@angular/core';
import {InOutAnimationsConfig} from '../inOutAnimationsConfig';
import {VISIBLE} from '../stateNames';

/**
 * Creates configured VisibleFlyInOutAnimation
 * @param {InOutAnimationsConfig} configuration Configuration object used for configuring animation
 * @returns AnimationEntryMetadata
 */
export function visibleFlyInOutAnimationConfig(configuration: InOutAnimationsConfig): AnimationEntryMetadata
{
    return trigger('visibleFlyInOut',
    [
        state('*', style(
        {
            opacity: 0,
            transform: "translateX(16%)"
        })),
        state(VISIBLE, style(
        {
            opacity: '*',
            transform: '*'
        })),
        transition(`* => ${VISIBLE}`, animate(configuration.inTiming)),
        transition(`${VISIBLE} => *`, animate(configuration.outTiming))
    ]);
};

/**
 * Default VisibleFlyInOutAnimation
 */
export const VisibleFlyInOutAnimation = visibleFlyInOutAnimationConfig(
{
    inTiming: '380ms 30ms ease-in',
    outTiming: '380ms 30ms ease-out'
});
