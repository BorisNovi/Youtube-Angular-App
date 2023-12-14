import { createAction, props } from '@ngrx/store';
import { ISearch } from 'src/app/youtube/models/search/search-params.model';
import { VideoItemModel } from 'src/app/youtube/models/search/video-item.model';

export const getVideos = createAction('[REGUlAR] fetchVideo', props<{ searchParams: ISearch }>());
export const getVideosSuccess = createAction('[REGULAR] success', props<{ videos: { [id: string]: VideoItemModel } }>());
export const addCustomVideo = createAction('[CUSTOM] addCustomVideo', props<{ videos: { [id: string]: VideoItemModel } }>());
export const removeCustomVideo = createAction('[CUSTOM] removeCustomVideo', props<{ id: string }>());
