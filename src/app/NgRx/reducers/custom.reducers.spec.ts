import { customReducer } from './custom.reducers';
import { addCustomId, removeCustomId } from '../actions/custom.actions';
import { CustomState, initialState } from './custom.states';

describe('Custom Reducer', () => {
  it('should add custom id to customList', () => {
    const customVideoId = 'HwAPLk_sQ3w';
    const action = addCustomId({ customVideoId });
    const newState = customReducer(initialState, action);

    expect(newState.customList).toContain(customVideoId);
  });

  it('should not add duplicate custom id to customList', () => {
    const customVideoId = 'HwAPLk_sQ3w';
    const state: CustomState = { customList: [customVideoId] };
    const action = addCustomId({ customVideoId });
    const newState = customReducer(state, action);

    expect(newState.customList).toEqual([customVideoId]);
  });

  it('should remove custom id from customList', () => {
    const customVideoId = 'HwAPLk_sQ3w';
    const state: CustomState = { customList: [customVideoId] };
    const action = removeCustomId({ customVideoId });
    const newState = customReducer(state, action);

    expect(newState.customList).toEqual([]);
  });

  it('should not remove non-existent custom id from customList', () => {
    const customVideoId = 'HwAPLk_sQ3w';
    const state: CustomState = { customList: [] };
    const action = removeCustomId({ customVideoId });
    const newState = customReducer(state, action);

    expect(newState.customList).toEqual([]);
  });
});
