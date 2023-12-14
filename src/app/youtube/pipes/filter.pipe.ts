import { Pipe, PipeTransform } from '@angular/core';
import { VideoItemModel } from '../models/search/video-item.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(array: VideoItemModel[], keyword: string): VideoItemModel[] {
    if (!array) return [];

    return array.filter((item) => item.snippet.title
      .toLowerCase().includes(keyword));
  }
}
