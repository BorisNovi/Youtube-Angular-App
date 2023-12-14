import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageTokensState } from '../reducers/pageTokens.states';

export const selectFeaturePageTokens = createFeatureSelector<PageTokensState>('pageTokens');

export const selectPageTokens = createSelector(
  selectFeaturePageTokens,
  (state) => state.pageTokens
);
