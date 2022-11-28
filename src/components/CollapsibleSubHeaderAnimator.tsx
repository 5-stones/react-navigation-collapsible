import * as React from 'react';
import { Animated } from 'react-native';

const CollapsibleSubHeaderAnimator = ({
  children,
  translateY,
  onHandleLayout,
}: {
  children: React.ReactNode;
  translateY: Animated.AnimatedInterpolation;
  onHandleLayout?: (height: number) => void;
}) => {
  const handleLayout = ({
    nativeEvent: {
      layout: { height = 0 },
    },
  }) => onHandleLayout && onHandleLayout(height);


  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: 'absolute',
        width: '100%',
      }}
      onLayout={handleLayout}>
      {children}
    </Animated.View>
  );
};

export { CollapsibleSubHeaderAnimator };
