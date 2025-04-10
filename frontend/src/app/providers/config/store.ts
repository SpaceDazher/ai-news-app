import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { authReducer } from '@/entities/user/model/authSlice';
import { sourceReducer } from '@/entities/source/model/sourceSlice';
import { postReducer } from '@/entities/post/model/postSlice';
import { analysisResultReducer } from '@/entities/analysisResult/model/analysisResultSlice';
import { foldersReducer } from '@/entities/folder/model/foldersSlice';
import { dashboardReducer } from '@/entities/dashboard/model/dashboardSlice';
import { modulesConfigReducer } from '@/entities/analysisModule/model/modulesConfigSlice';

export function createStore(initialState?: StateSchema) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    auth: authReducer,
    sources: sourceReducer,
    posts: postReducer,
    analysisResult: analysisResultReducer,
    folders: foldersReducer,
    dashboard: dashboardReducer,
    modulesConfig: modulesConfigReducer,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: true,
  });
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
