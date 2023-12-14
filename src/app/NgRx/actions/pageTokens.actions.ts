import { createAction, props } from '@ngrx/store';

export const setPageTokens = createAction('[PAGE_TOKENS] set', props<{ prevPageToken: string, nextPageToken: string }>());
