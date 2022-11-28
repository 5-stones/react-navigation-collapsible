import type { UseCollapsibleOptions } from '../types';
import { useCollapsibleHeader } from './useCollapsibleHeader';
import { CollapsibleHeaderType } from '../enums'

export const useCollapsibleSubHeader = (options?: UseCollapsibleOptions) =>
    useCollapsibleHeader(options, CollapsibleHeaderType.SubHeader);
