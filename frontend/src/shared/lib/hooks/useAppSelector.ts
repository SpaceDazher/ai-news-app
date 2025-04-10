import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/app/providers/config/store';

// Используйте этот хук вместо обычного `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
