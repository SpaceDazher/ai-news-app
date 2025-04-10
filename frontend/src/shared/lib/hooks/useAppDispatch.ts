import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/providers/config/store';

// Используйте этот хук вместо обычного `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();
