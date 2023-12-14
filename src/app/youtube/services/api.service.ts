import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SearchResponseModel } from '../models/search/search-response.model';
import { ISearch } from '../models/search/search-params.model';
import { SearchItemModel } from '../models/search/search-item.model';
import { VideoItemModel } from '../models/search/video-item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = 'https://www.googleapis.com/youtube/v3/';

  private headers = new HttpHeaders({
    Accept: 'application/json'
  });

  constructor(private http: HttpClient, private store: Store) { }

  searchVideos(searchParams: ISearch): Observable<SearchResponseModel<SearchItemModel>> {
    const {
      q, maxResults, order, pageToken
    } = searchParams;
    const dataUrl = `${this.baseUrl}search?&part=snippet&type=video&maxResults=${maxResults || ''}&order=${order || 'relevance'}&q=${q || ''}&pageToken=${pageToken || ''}`;
    return this.http
      .get<SearchResponseModel<SearchItemModel>>(dataUrl, { headers: this.headers });
  }

  getVideos(id: string[]): Observable<SearchResponseModel<VideoItemModel>> {
    const dataUrl = `${this.baseUrl}videos?&part=snippet,statistics&type=video&id=${id.join(',') || ''}`;
    return this.http
      .get<SearchResponseModel<VideoItemModel>>(dataUrl, { headers: this.headers });
  }

  getItems(searchParams: ISearch): Observable<{
    videos: { [id: string]: VideoItemModel },
    tokens: { prevPageToken: string, nextPageToken: string }
  }> {
    return this.searchVideos(searchParams).pipe(
      switchMap((data) => {
        const ids = data.items.map((item) => item.id.videoId);
        return this.getVideos(ids).pipe(
          map((videosData) => {
            const result = {} as { [id: string]: VideoItemModel };
            videosData.items.forEach((item) => { result[item.id] = item; });
            return {
              videos: result,
              tokens: {
                prevPageToken: data.prevPageToken,
                nextPageToken: data.nextPageToken
              }
            };
          })
        );
      })
    );
  }
}
