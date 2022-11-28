import { getStatusBarHeight } from './getStatusBarHeight';

export const getNavigationHeight = (isLandscape: boolean, headerHeight: number) => {
    return headerHeight + getStatusBarHeight(isLandscape);
};
