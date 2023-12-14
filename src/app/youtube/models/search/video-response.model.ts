import { SearchResponseModel } from './search-response.model';
import { VideoItemModel } from './video-item.model';

export interface VideoResponseModel extends Omit<SearchResponseModel, 'items'> {
  items: VideoItemModel
}
