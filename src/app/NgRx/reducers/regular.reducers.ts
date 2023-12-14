import { createReducer, on } from '@ngrx/store';
import { RegularState, initialState } from './regular.states';
import { addRegularId } from '../actions/regular.actions';

export const regularReducer = createReducer(
  initialState,
  on(addRegularId, (state, { regularVideoIds }): RegularState => ({
    ...state,
    regularList: [...regularVideoIds],
  }))
);
