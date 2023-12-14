import { createReducer, on } from '@ngrx/store';
import { VideosState, initialVideoState } from './videos.states';
import { addCustomVideo, getVideosSuccess, removeCustomVideo } from '../actions/videos.actions';

export const videosReducer = createReducer(
  initialVideoState,
  on(getVideosSuccess, (state, { videos }): VideosState => {
    const newItems = { ...state.items, ...videos };

    return { ...state, items: newItems };
  }),
  on(addCustomVideo, (state, { videos }): VideosState => {
    const newItems = { ...state.items, ...videos };

    return { ...state, items: newItems };
  }),
  on(removeCustomVideo, (state, payload): VideosState => {
    const newItems = { ...state.items };
    delete newItems[payload.id];
    return { ...state, items: newItems };
  })
);
