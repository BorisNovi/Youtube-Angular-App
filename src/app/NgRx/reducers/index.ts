import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { FavoriteState } from './favorite.states';
import { favoritesReducer } from './favorite.reducers';
import { VideosState } from './videos.states';
import { videosReducer } from './videos.reducers';
import { CustomState } from './custom.states';
import { customReducer } from './custom.reducers';
import { RegularState } from './regular.states';
import { regularReducer } from './regular.reducers';
import { PageTokensState } from './pageTokens.states';
import { pageTokensReducer } from './pageTokens.reducers';

export interface State {
  videos: VideosState;
  regular: RegularState;
  custom: CustomState;
  favorites: FavoriteState;
  pageTokens: PageTokensState;
}

export const reducers: ActionReducerMap<State> = {
  videos: videosReducer,
  regular: regularReducer,
  custom: customReducer,
  favorites: favoritesReducer,
  pageTokens: pageTokensReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
