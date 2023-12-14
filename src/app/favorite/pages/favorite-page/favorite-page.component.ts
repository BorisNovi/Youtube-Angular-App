import {
  Component, DestroyRef, OnInit, inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { selectFavorites } from 'src/app/NgRx/selectors/favorite.selectors';
import { selectVideos } from 'src/app/NgRx/selectors/videos.selectors';
import { VideoItemModel } from 'src/app/youtube/models/search/video-item.model';
import { ApiService } from 'src/app/youtube/services/api.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {
  favorites$ = this.store.select(selectFavorites);
  isFavorite = false;
  favoriteVideos!: VideoItemModel[];
  private destroyRef = inject(DestroyRef);
  constructor(private store: Store, private api: ApiService) {}

  ngOnInit(): void {
    this.drawFavorites();
  }

  drawFavorites(): void {
    this.getFavoritesVideosFromState()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((videos) => {
        this.favoriteVideos = (videos);
      });
  }

  getFavoritesVideosFromState(): Observable<VideoItemModel[]> {
    return this.store.select(selectFavorites)
      .pipe(
        switchMap((ids) => this.store.select(selectVideos)
          .pipe(
            map((videos) => {
              if (videos) {
                return ids.map((id) => videos[id]);
              }
              return [];
            }),
          ))
      );
  }
}
