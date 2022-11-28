import { Platform } from 'react-native';

const SAFEBOUNCE_HEIGHT_IOS = 300;
const SAFEBOUNCE_HEIGHT_ANDROID = 100;
const SAFEBOUNCE_HEIGHT_WEB = 0;

let safeBounceHeight: number = Platform.select({
    ios: SAFEBOUNCE_HEIGHT_IOS,
    android: SAFEBOUNCE_HEIGHT_ANDROID,
    web: SAFEBOUNCE_HEIGHT_WEB,
}) || SAFEBOUNCE_HEIGHT_WEB;

export const setSafeBounceHeight = (height: number) => {
    safeBounceHeight = height;
};

export const getSafeBounceHeight = () => safeBounceHeight;
