import { Platform } from 'react-native';

export const getDefaultHeaderHeight = (isLandscape: boolean) => {
    if (Platform.OS === 'ios') {
        if (isLandscape && !Platform.isPad) {
            return 32;
        } else {
            return 44;
        }
    } else if (Platform.OS === 'android') {
        return 56;
    }
    return 64;
};
