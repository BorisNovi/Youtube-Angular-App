import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideosState } from '../reducers/videos.states';

export const selectFeatureVideos = createFeatureSelector<VideosState>('videos');

export const selectVideos = createSelector(
  selectFeatureVideos,
  (state) => state.items
);
