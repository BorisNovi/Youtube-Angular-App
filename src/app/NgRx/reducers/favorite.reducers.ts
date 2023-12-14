import { createReducer, on } from '@ngrx/store';
import { FavoriteState, initialState } from './favorite.states';
import { addFavorite, removeFavorite } from '../actions/favorite.actions';

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { favoriteVideoId }): FavoriteState => {
    if (!state.favoriteList.includes(favoriteVideoId)) {
      return {
        ...state,
        favoriteList: [...state.favoriteList, favoriteVideoId],
      };
    }
    return state;
  }),
  on(removeFavorite, (state, { favoriteVideoId }): FavoriteState => ({
    ...state,
    favoriteList: state.favoriteList.filter((id) => id !== favoriteVideoId)
  }))
);
