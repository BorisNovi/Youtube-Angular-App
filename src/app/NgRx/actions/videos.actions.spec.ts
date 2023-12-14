import { ISearch } from 'src/app/youtube/models/search/search-params.model';
import { VideoItemModel } from 'src/app/youtube/models/search/video-item.model';
import {
  getVideos, getVideosSuccess, addCustomVideo, removeCustomVideo
} from './videos.actions';

describe('Your Actions', () => {
  const searchParams: ISearch = { q: 'smth' };
  const videos: { [id: string]: VideoItemModel } = {
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
  const customVideoId = '123';

  it('should create getVideos action', () => {
    const action = getVideos({ searchParams });

    expect(action.type).toEqual('[REGUlAR] fetchVideo');
    expect(action.searchParams).toEqual(searchParams);
  });

  it('should create getVideosSuccess action', () => {
    const action = getVideosSuccess({ videos });

    expect(action.type).toEqual('[REGULAR] success');
    expect(action.videos).toEqual(videos);
  });

  it('should create addCustomVideo action', () => {
    const action = addCustomVideo({ videos });

    expect(action.type).toEqual('[CUSTOM] addCustomVideo');
    expect(action.videos).toEqual(videos);
  });

  it('should create removeCustomVideo action', () => {
    const action = removeCustomVideo({ id: customVideoId });

    expect(action.type).toEqual('[CUSTOM] removeCustomVideo');
    expect(action.id).toEqual(customVideoId);
  });
});
