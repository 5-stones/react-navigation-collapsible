import { Platform, ViewStyle } from 'react-native';

export const getElevationStyle = (elevation: number): ViewStyle => {
    if (Platform.OS === 'ios') {
        if (elevation === 0) return {};
        else
            return {
                shadowOpacity: 0.0015 * elevation + 0.18,
                shadowRadius: 0.54 * elevation,
                shadowOffset: {
                    height: 0.6 * elevation,
                    width: 0.6 * elevation,
                },
            };
    } else {
        return {
            elevation: elevation,
        };
    }
};
