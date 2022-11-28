import React, {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
} from 'react';
import {
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent,
    useWindowDimensions,
} from 'react-native';
import shallowequal from 'shallowequal';

import {
    getDefaultHeaderHeight,
    getNavigationHeight,
    getStatusBarHeight,
} from '../utils';
import { createHeaderBackground as createDefaultHeaderBackground } from '../utils/createHeaderBackground';
import {
    createCollapsibleCustomHeaderAnimator,
    getSafeBounceHeight,
} from '../utils/';
import { CollapsibleHeaderType } from '../enums';
import type { Collapsible, UseCollapsibleOptions } from '../types';

export const useCollapsibleHeader = (
    options?: UseCollapsibleOptions,
    collapsibleHeaderType: CollapsibleHeaderType = CollapsibleHeaderType.Default,
    onSetNavigationOptions?: (options: any) => void,
): Collapsible => {
    const { navigationOptions = {}, config = {} } = options || {};
    const {
        useNativeDriver = true,
        elevation,
        collapsedColor,
        disableOpacity = false,
        createHeaderBackground = createDefaultHeaderBackground,
    } = config;

    const { headerStyle: userHeaderStyle = {} } = navigationOptions;
    const [headerStyle, setHeaderStyle] = useState(userHeaderStyle);
    useEffect(() => {
        if (!shallowequal(headerStyle, userHeaderStyle))
            setHeaderStyle(userHeaderStyle);
    }, [userHeaderStyle]);

    const [collapsible, setCollapsible] = useState<Collapsible>();
    const { width, height } = useWindowDimensions();
    const isLandscape = height < width;
    const positionY = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: positionY } } }],
        { useNativeDriver }
    );
    const onScrollWithListener = (
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    ) =>
        Animated.event([{ nativeEvent: { contentOffset: { y: positionY } } }], {
            useNativeDriver,
            listener,
        });

    const offsetY = useRef(new Animated.Value(0)).current;
    const offsetYValue = useRef(0);
    useEffect(() => {
        const listener = offsetY.addListener(({ value }) => {
            offsetYValue.current = value;
        });

        return () => {
            offsetY.removeListener(listener);
        };
    }, []);

    useLayoutEffect(() => {
        const headerHeight = headerStyle.height != null
            ? headerStyle.height - getStatusBarHeight(isLandscape)
            : getDefaultHeaderHeight(isLandscape);
        const safeBounceHeight = getSafeBounceHeight();

        const animatedDiffClampY = Animated.diffClamp(
            Animated.add(positionY, offsetY),
            0,
            safeBounceHeight + headerHeight
        );

        const progress = animatedDiffClampY.interpolate({
            inputRange: [safeBounceHeight, safeBounceHeight + headerHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        const translateY = Animated.multiply(progress, -headerHeight);
        const opacity = Animated.subtract(1, disableOpacity ? 0 : progress);

        if (collapsibleHeaderType === CollapsibleHeaderType.Default && onSetNavigationOptions) {
            const options = {
                ...navigationOptions,
                headerStyle: {
                    ...headerStyle,
                    transform: [{ translateY }],
                    opacity,
                },
                headerBackground: createHeaderBackground({
                    translateY,
                    opacity,
                    backgroundColor: headerStyle?.backgroundColor,
                    collapsedColor: collapsedColor || headerStyle?.backgroundColor,
                    elevation,
                    headerBackground: navigationOptions.headerBackground,
                }),
                headerTransparent: true,
            };
            if (navigationOptions.header) {
                Object.assign(options, {
                    header: createCollapsibleCustomHeaderAnimator(
                        navigationOptions.header
                    ),
                });
            }

            onSetNavigationOptions(options);
        }

        const collapsible: Collapsible = {
            onScroll,
            onScrollWithListener,
            containerPaddingTop:
                collapsibleHeaderType === CollapsibleHeaderType.SubHeader
                    ? headerHeight
                    : getNavigationHeight(isLandscape, headerHeight),
            scrollIndicatorInsetTop: headerHeight,
            positionY,
            offsetY,
            translateY,
            progress,
            opacity,
            showHeader: () => {
                offsetY.setValue(offsetYValue.current - headerHeight);
            },
        };
        setCollapsible(collapsible);
    }, [isLandscape, headerStyle]);

    return (
        collapsible || {
            onScroll: null,
            onScrollWithListener: (_e) => { },
            containerPaddingTop: 0,
            scrollIndicatorInsetTop: 0,
            positionY: new Animated.Value(0),
            offsetY: new Animated.Value(0),
            translateY: new Animated.Value(0),
            progress: new Animated.Value(0),
            opacity: new Animated.Value(1),
            showHeader: () => {
                // do nothing
            },
        }
    );
};
