import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  Observable, map, of, switchMap
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { selectVideos } from 'src/app/NgRx/selectors/videos.selectors';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';
import { VideoItemModel } from '../../models/search/video-item.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private id = '';
  data!: VideoItemModel;
  video!: SafeResourceUrl;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private store: Store,
    private destroyRef: DestroyRef,
    private sanitizer: DomSanitizer
  ) {

  }
  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((params) => {
        this.id = params['id'];
      });

    this.getVideoFromStore(this.id)
      .pipe(
        switchMap((videoFromStore) => (videoFromStore.id
          ? of(videoFromStore)
          : this.getVideoFromApi(this.id))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((video) => {
        this.data = video;
        this.setVideoUrl();
      });
  }

  getVideoFromStore(videoId: string): Observable<VideoItemModel> {
    return this.store.select(selectVideos).pipe(
      // eslint-disable-next-line @ngrx/avoid-mapping-selectors
      map((videos) => {
        if (videos) {
          return videos[videoId];
        }
        return {} as VideoItemModel;
      }),
    );
  }

  getVideoFromApi(videoId: string): Observable<VideoItemModel> {
    return this.apiService.getVideos([videoId])
      .pipe(
        map((videoResponse) => videoResponse.items[0])
      );
  }

  private setVideoUrl(): void {
    const embedVideo = `https://www.youtube.com/embed/${this.id}`;
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl(embedVideo);
  }
}
