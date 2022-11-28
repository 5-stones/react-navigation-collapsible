import {
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';

export type Collapsible = {
    onScroll: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | null;
    onScrollWithListener: (
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    ) => ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | void;
    containerPaddingTop: number;
    scrollIndicatorInsetTop: number;
    positionY: Animated.AnimatedValue;
    offsetY: Animated.AnimatedValue;
    translateY: Animated.AnimatedInterpolation;
    progress: Animated.AnimatedInterpolation;
    opacity: Animated.AnimatedInterpolation;
    showHeader: () => void;
};
