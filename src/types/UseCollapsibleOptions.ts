import type { ReactNode } from 'react';

import type { CreateHeaderBackgroundProps } from '../utils';

export type UseCollapsibleOptions = {
    navigationOptions?: { [key: string]: any };
    config?: {
        useNativeDriver?: boolean;
        elevation?: number;
        collapsedColor?: string;
        disableOpacity?: boolean;
        createHeaderBackground?: (
            params: CreateHeaderBackgroundProps
        ) => ReactNode;
    };
};
