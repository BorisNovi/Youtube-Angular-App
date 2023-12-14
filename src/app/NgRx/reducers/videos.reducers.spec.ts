import { Action } from '@ngrx/store';
import { videosReducer } from './videos.reducers';
import { addCustomVideo, getVideosSuccess, removeCustomVideo } from '../actions/videos.actions';
import { VideosState, initialVideoState } from './videos.states';

describe('Videos Reducer', () => {
  it('should handle getVideosSuccess correctly', () => {
    const videos = {
      video1: {
        id: '1',
        kind: '',
        snippet: {
          publishedAt: '',
          title: '',
          description: '',
          thumbnails: { standard: { url: '' }, default: { url: '' } },
          tags: []
        },
        statistics: {
          viewCount: '',
          likeCount: '',
          dislikeCount: '',
          favoriteCount: '',
          commentCount: ''
        }
      },
      video2: {
        id: '2',
        kind: '',
        snippet: {
          publishedAt: '',
          title: '',
          description: '',
          thumbnails: { standard: { url: '' }, default: { url: '' } },
          tags: []
        },
        statistics: {
          viewCount: '',
          likeCount: '',
          dislikeCount: '',
          favoriteCount: '',
          commentCount: ''
        }
      },
    };
    const action = getVideosSuccess({ videos });
    const newState = videosReducer(initialVideoState, action);

    expect(newState.items).toEqual(videos);
  });

  it('should handle addCustomVideo correctly', () => {
    const customVideo = {
      id: '3',
      kind: 'Custom Video',
      snippet: {
        publishedAt: '',
        title: '',
        description: '',
        thumbnails: { standard: { url: '' }, default: { url: '' } },
        tags: []
      },
      statistics: {
        viewCount: '',
        likeCount: '',
        dislikeCount: '',
        favoriteCount: '',
        commentCount: ''
      }
    };
    const action = addCustomVideo({ videos: { [customVideo.id]: customVideo } });
    const newState = videosReducer(initialVideoState, action);

    expect(newState.items).toEqual({ ...initialVideoState.items, [customVideo.id]: customVideo });
  });

  it('should handle removeCustomVideo correctly', () => {
    const videoToRemove = {
      id: '4',
      kind: 'Video To Remove',
      snippet: {
        publishedAt: '',
        title: '',
        description: '',
        thumbnails: { standard: { url: '' }, default: { url: '' } },
        tags: []
      },
      statistics: {
        viewCount: '',
        likeCount: '',
        dislikeCount: '',
        favoriteCount: '',
        commentCount: ''
      }
    };
    const state: VideosState = { items: { [videoToRemove.id]: videoToRemove } };
    const action = removeCustomVideo({ id: videoToRemove.id });
    const newState = videosReducer(state, action);

    expect(newState.items).toEqual({});
  });

  it('should not modify state for unknown action', () => {
    const action: Action = { type: 'UNKNOWN_ACTION' };
    const newState = videosReducer(initialVideoState, action);

    expect(newState).toEqual(initialVideoState);
  });
});
