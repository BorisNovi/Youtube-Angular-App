import {
  Component, DestroyRef, OnInit, Signal, ViewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  Observable,
  Subscription,
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  switchMap,
  take,
} from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { getVideos } from 'src/app/NgRx/actions/videos.actions';
import { Store } from '@ngrx/store';
import { selectCustom } from 'src/app/NgRx/selectors/custom.selectors';
import { selectVideos } from 'src/app/NgRx/selectors/videos.selectors';
import { selectRegular } from 'src/app/NgRx/selectors/regular.selectors';
import { selectPageTokens } from 'src/app/NgRx/selectors/pageTokens.selectors';
import { ISort } from '../../models/search/sort-params.model';
import { YoutubeHeaderDataSharingService } from '../../services/youtube-header-data-sharing.service';
import { ISearch, SearchOrder } from '../../models/search/search-params.model';
import { VideoItemModel } from '../../models/search/video-item.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  subscription$!: Subscription;

  dataForSearch!: VideoItemModel[];
  searchTerm$: Observable<string> = toObservable(this.dataSharingService.currentSearchTerm);
  private prevSearchQuery = '';
  sortParams: Signal<ISort> = this.dataSharingService.currentSortParams;
  keyword: Signal<string> = this.dataSharingService.currentKeyword;

  isSortingOpen: Signal<boolean> = this.dataSharingService.currentSortingOpenState;

  termLengthThreshold = 3;
  inputDelay = 1000;
  maxResultsOnPage = 20;
  prevPageToken: string | null = '';
  nextPageToken: string | null = '';
  currentPageToken = '';

  paginatorLength = 100;
  pageIndex = 0;
  paginatorDisabled = false;

  prevPageIndex = 0;

  constructor(
    private dataSharingService: YoutubeHeaderDataSharingService,
    private destroyRef: DestroyRef,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.useSearch();
  }

  useSearch() {
    merge(this.paginator.page, this.searchTerm$.pipe(debounceTime(this.inputDelay))).pipe(
      filter((term) => term.length >= this.termLengthThreshold),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      const searchParams: ISearch = {
        q: this.dataSharingService.currentSearchTerm(),
        maxResults: this.setLoadResults(this.maxResultsOnPage, this.pageIndex),
        order: SearchOrder.relevance,
        pageToken: this.getPageToken(this.pageIndex)
      };
      this.search(searchParams);
    });

    this.getSearchedVideos();

    this.store.select(selectPageTokens).pipe(
      takeUntilDestroyed(this.destroyRef),
    )
      .subscribe((tokens) => {
        this.prevPageToken = tokens.prevPageToken;
        this.nextPageToken = tokens.nextPageToken;
      });
  }

  getPageToken(pageIndex: number): string {
    if (this.prevPageIndex
      && pageIndex < this.prevPageIndex && this.prevPageToken) {
      return this.prevPageToken;
    }

    if ((!this.prevPageIndex
      || pageIndex > this.prevPageIndex) && this.nextPageToken) {
      return this.nextPageToken;
    }

    return '';
  }

  setLoadResults(resultsRequired: number, pageIndex: number): number {
    let resultsOnPage = resultsRequired;
    this.store.select(selectCustom).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      if (!pageIndex && resultsOnPage > 0) {
        resultsOnPage -= data.length;
      }
    });
    return resultsOnPage;
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.prevPageIndex = event.previousPageIndex || 0;
  }

  private search(searchParams: ISearch): void {
    this.store.dispatch(getVideos({ searchParams }));

    if (searchParams.q !== this.prevSearchQuery) { // сброс пагинации при обновлении поиска
      this.pageIndex = 0;
      this.prevPageToken = '';
    }

    this.prevSearchQuery = searchParams.q || '';
  }

  private getVideosByIds(
    ids: string[],
    videos: { [id: string]: VideoItemModel } | null
  ): VideoItemModel[] {
    return videos ? ids.map((id) => videos[id]) : [];
  }

  getCustomVideosFromState(): Observable<VideoItemModel[]> {
    return this.store.select(selectCustom)
      .pipe(
        switchMap((ids) => this.store.select(selectVideos)
          .pipe(
            map((videos) => this.getVideosByIds(ids, videos)),
          ))
      );
  }

  getRegularVideosFromState(): Observable<VideoItemModel[]> {
    return this.store.select(selectRegular)
      .pipe(
        switchMap((ids) => this.store.select(selectVideos)
          .pipe(
            map((videos) => this.getVideosByIds(ids, videos)),
          ))
      );
  }

  public getSearchedVideos(): void {
    combineLatest({
      regularData: this.getRegularVideosFromState(),
      customData: this.getCustomVideosFromState()
    }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(({ regularData, customData }) => {
      const useCustom = this.pageIndex ? [] : customData;
      this.dataForSearch = [...useCustom, ...regularData];
    });
  }
}
