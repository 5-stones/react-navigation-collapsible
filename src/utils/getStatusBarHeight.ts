import { Platform, StatusBar } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { disabledExpoTranslucentStatusBar } from './disableExpoTranslucentStatusBar';

let isExpo = false;
try {
    // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
    const Constants = require('expo-constants').default;
    // True if the app is running in an `expo build` app or if it's running in Expo Go.
    isExpo =
        Constants.executionEnvironment === 'standalone' ||
        Constants.executionEnvironment === 'storeClient';
    // eslint-disable-next-line no-empty
} catch { }

export const getStatusBarHeight: (is: boolean) => number = (isLandscape: boolean) => {
    if (Platform.OS === 'ios') {
        if (isLandscape) return 0;
        return isIphoneX() ? 44 : 20;
    } else if (Platform.OS === 'android') {
        // eslint-disable-next-line no-undef
        // @ts-ignore
        return (global.Expo || isExpo) && !disabledExpoTranslucentStatusBar
            ? StatusBar.currentHeight
            : 0;
    } else return 0;
};
