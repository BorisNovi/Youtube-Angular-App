import { SearchItemModel } from './search-item.model';

export interface VideoItemModel extends Omit<SearchItemModel, 'id'> {
  id: string;
}
