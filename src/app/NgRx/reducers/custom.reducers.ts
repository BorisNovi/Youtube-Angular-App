import { createReducer, on } from '@ngrx/store';
import { CustomState, initialState } from './custom.states';
import { addCustomId, removeCustomId } from '../actions/custom.actions';

export const customReducer = createReducer(
  initialState,
  on(addCustomId, (state, { customVideoId }): CustomState => {
    if (!state.customList.includes(customVideoId)) {
      return {
        ...state,
        customList: [...state.customList, customVideoId],
      };
    }
    return state;
  }),
  on(removeCustomId, (state, { customVideoId }): CustomState => ({
    ...state,
    customList: state.customList.filter((id) => id !== customVideoId)
  }))
);
