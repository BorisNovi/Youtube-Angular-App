import { Pipe, PipeTransform } from '@angular/core';
import { VideoItemModel } from '../models/search/video-item.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(array: VideoItemModel[], searchTerm: string): VideoItemModel[] {
    if (!searchTerm) {
      return [];
    }

    const sorted = array.filter((item) => item.snippet.title.toLowerCase().includes(searchTerm));
    return sorted;
  }
}
