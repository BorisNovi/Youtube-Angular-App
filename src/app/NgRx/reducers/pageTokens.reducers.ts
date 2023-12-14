import { createReducer, on } from '@ngrx/store';
import { PageTokensState, initialState } from './pageTokens.states';
import { setPageTokens } from '../actions/pageTokens.actions';

export const pageTokensReducer = createReducer(
  initialState,
  on(setPageTokens, (state, { prevPageToken, nextPageToken }): PageTokensState => ({
    ...state,
    pageTokens: { prevPageToken, nextPageToken }
  }))
);
