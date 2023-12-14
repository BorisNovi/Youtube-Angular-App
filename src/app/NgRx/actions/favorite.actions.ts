import { createAction, props } from '@ngrx/store';

export const addFavorite = createAction('[FAVORITE] add', props<{ favoriteVideoId: string }>());
export const removeFavorite = createAction('[FAVORITE] remove', props<{ favoriteVideoId: string }>());
