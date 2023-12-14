import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from '../reducers/favorite.states';

export const selectFeatureFavorites = createFeatureSelector<FavoriteState>('favorites');

export const selectFavorites = createSelector(
  selectFeatureFavorites,
  (state) => state.favoriteList
);
