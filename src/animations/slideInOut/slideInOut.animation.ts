import {trigger, transition, animate, keyframes, style, AnimationEntryMetadata} from '@angular/core';
import {InOutAnimationsConfig} from '../inOutAnimationsConfig';

/**
 * Creates configured SlideInOutAnimation
 * @param  {InOutAnimationsConfig} configuration Configuration object used for configuring animation
 * @returns AnimationEntryMetadata
 */
export function slideInOutAnimationConfig(configuration: InOutAnimationsConfig): AnimationEntryMetadata
{
    return trigger('slideInOut',
    [
        transition('void => *',
        [
            animate(configuration.inTiming,
                    keyframes(
                    [
                        style(
                        {
                            opacity: 0,
                            "font-size": 0,
                            "margin-top": 0,
                            "padding-top": 0,
                            "margin-bottom": 0,
                            "padding-bottom": 0,
                            "border-top-width": 0,
                            "border-bottom-width": 0,
                            offset: 0
                        }),
                        style(
                        {
                            opacity: 0,
                            "font-size": '*',
                            "margin-top": '*',
                            "padding-top": '*',
                            "margin-bottom": '*',
                            "padding-bottom": '*',
                            "border-top-width": '*',
                            "border-bottom-width": '*',
                            offset: 0.4
                        }),
                        style({opacity: '*', offset: 1})
                    ]))
        ]),
        transition('* => void',
        [
            animate(configuration.outTiming,
                    keyframes(
                    [
                        style({opacity: '*', offset: 0}),
                        style(
                        {
                            opacity: 0,
                            "font-size": '*',
                            "margin-top": '*',
                            "padding-top": '*',
                            "margin-bottom": '*',
                            "padding-bottom": '*',
                            "border-top-width": '*',
                            "border-bottom-width": '*', 
                            offset: 0.6
                        }),
                        style(
                        {
                            opacity: 0,
                            "font-size": 0,
                            "margin-top": 0,
                            "padding-top": 0,
                            "margin-bottom": 0,
                            "padding-bottom": 0,
                            "border-top-width": 0,
                            "border-bottom-width": 0, 
                            offset: 1
                        })
                    ]))
        ])
    ])
};

/**
 * Default SlideInOutAnimation
 */
export const SlideInOutAnimation = slideInOutAnimationConfig(
{
    inTiming: '0.4s ease-in',
    outTiming: '0.4s ease-out'
})
