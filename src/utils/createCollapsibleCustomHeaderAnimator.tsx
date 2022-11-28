import React from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';

import { CustomHeader } from '../types';

export const createCollapsibleCustomHeaderAnimator = (
  customHeader: CustomHeader
) => (headerProps: any) => (
  <Animated.View
    style={headerProps?.options?.headerStyle}
    onLayout={(e: LayoutChangeEvent) => {
      headerProps.navigation.setParams({
        collapsibleCustomHeaderHeight: e.nativeEvent.layout.height,
      });
    }}>
    {customHeader(headerProps)}
  </Animated.View>
);
