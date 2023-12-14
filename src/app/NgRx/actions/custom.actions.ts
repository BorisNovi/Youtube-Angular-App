import { createAction, props } from '@ngrx/store';

export const addCustomId = createAction('[CUSTOM] addCustomId', props<{ customVideoId: string }>());
export const removeCustomId = createAction('[CUSTOM] removeCustomId', props<{ customVideoId: string }>());
