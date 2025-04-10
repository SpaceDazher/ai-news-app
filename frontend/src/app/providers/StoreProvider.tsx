import { Provider } from 'react-redux';
import { createStore } from '@/app/providers/config/store';
import { StateSchema } from '@/app/providers/config/StateSchema';

interface StoreProviderProps {
  children?: React.ReactNode;
  initialState?: StateSchema;
}

export type { AppDispatch, RootState } from '@/app/providers/config/store';

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props;
  const store = createStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
