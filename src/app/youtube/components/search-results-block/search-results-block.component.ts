import {
  Component, Input
} from '@angular/core';
import { VideoItemModel } from '../../models/search/video-item.model';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss']
})
export class SearchResultsBlockComponent {
  @Input() dataFromSearch: VideoItemModel[] = [];
}
