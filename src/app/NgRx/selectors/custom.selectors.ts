import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomState } from '../reducers/custom.states';

export const selectFeatureCustom = createFeatureSelector<CustomState>('custom');

export const selectCustom = createSelector(
  selectFeatureCustom,
  (state) => state.customList
);
