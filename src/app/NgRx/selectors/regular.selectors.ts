import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegularState } from '../reducers/regular.states';

export const selectFeatureRegular = createFeatureSelector<RegularState>('regular');

export const selectRegular = createSelector(
  selectFeatureRegular,
  (state) => state.regularList
);
