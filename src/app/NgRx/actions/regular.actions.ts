import { createAction, props } from '@ngrx/store';

export const addRegularId = createAction('[REGULAR] addRegularId', props<{ regularVideoIds: string[] }>());
