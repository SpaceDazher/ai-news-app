import { AuthState } from '@/entities/user/model/authSlice';
import { SourceState } from '@/entities/source/model/sourceSlice';
import { PostState } from '@/entities/post/model/postSlice';
import { AnalysisResultState } from '@/entities/analysisResult/model/analysisResultSlice';
import type { FoldersState } from '@/entities/folder/model/foldersSlice';
import type { DashboardState } from '@/entities/dashboard/model/dashboardSlice';
import type { ModulesConfigState } from '@/entities/analysisModule/model/modulesConfigSlice';

export interface StateSchema {
  auth: AuthState;
  sources: SourceState;
  posts: PostState;
  analysisResult: AnalysisResultState;
  folders: FoldersState;
  dashboard: DashboardState;
  modulesConfig: ModulesConfigState;
  // Другие слайсы будут добавлены позже
}
