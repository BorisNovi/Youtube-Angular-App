import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { ISearch } from '../models/search/search-params.model';
import { SearchResponseModel } from '../models/search/search-response.model';
import { SearchItemModel } from '../models/search/search-item.model';
import { VideoItemModel } from '../models/search/video-item.model';

const mockSearchResponse: SearchResponseModel<SearchItemModel> = {
  items: [{
    id: { kind: '', videoId: '1' },
    kind: '',
    statistics: {
      viewCount: '',
      likeCount: '',
      dislikeCount: '',
      favoriteCount: '',
      commentCount: ''
    },
    snippet: {
      publishedAt: '',
      title: '',
      description: '',
      thumbnails: { standard: { url: '' }, default: { url: '' } },
      tags: []
    }
  }],
  prevPageToken: 'prevToken',
  nextPageToken: 'nextToken',
  TODO: '',
  kind: '',
  etag: '',
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0
  }
};

const mockVideoItem: VideoItemModel = {
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
};

const mockVideoResponse: SearchResponseModel<VideoItemModel> = {
  items: [mockVideoItem],
  TODO: '',
  kind: '',
  etag: '',
  prevPageToken: '',
  nextPageToken: '',
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0
  }
};

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve search results', (done) => {
    const mockSearchParams: ISearch = { q: 'test', maxResults: 5 };

    service.searchVideos(mockSearchParams).subscribe((data) => {
      expect(data).toEqual(mockSearchResponse);
      done();
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}search?&part=snippet&type=video&maxResults=5&order=relevance&q=test&pageToken=`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockSearchResponse);
  });

  it('should retrieve video details', (done) => {
    const mockVideoIds: string[] = ['1', '2'];

    service.getVideos(mockVideoIds).subscribe((data) => {
      expect(data).toEqual(mockVideoResponse);
      done();
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}videos?&part=snippet,statistics&type=video&id=1,2`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockVideoResponse);
  });

  it('should retrieve items with videos and tokens', (done) => {
    const mockSearchParams: ISearch = { q: 'test', maxResults: 5 };

    jest.spyOn(service, 'searchVideos').mockReturnValue(of(mockSearchResponse));
    jest.spyOn(service, 'getVideos').mockReturnValue(of(mockVideoResponse));

    service.getItems(mockSearchParams).subscribe((data) => {
      expect(data.videos).toEqual({ 1: mockVideoItem });
      expect(data.tokens).toEqual({ prevPageToken: 'prevToken', nextPageToken: 'nextToken' });
      done();
    });
  });
});
