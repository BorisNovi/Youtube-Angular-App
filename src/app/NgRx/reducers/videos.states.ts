import { VideoItemModel } from 'src/app/youtube/models/search/video-item.model';

export interface VideosState {
  items: { [id: string]: VideoItemModel } | null
}

export const initialVideoState: VideosState = {
  items: null,
};
