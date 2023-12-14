import {
  Component, DestroyRef, Input, OnInit, inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { addFavorite, removeFavorite } from 'src/app/NgRx/actions/favorite.actions';
import { selectFavorites } from 'src/app/NgRx/selectors/favorite.selectors';
import { VideoItemModel } from 'src/app/youtube/models/search/video-item.model';

@Component({
  selector: 'app-fav-card',
  templateUrl: './fav-card.component.html',
  styleUrls: ['./fav-card.component.scss']
})
export class FavCardComponent implements OnInit {
  @Input() videoData!: VideoItemModel;

  isFavorite = false;
  favorites$ = this.store.select(selectFavorites);
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.checkFavorites();
  }

  checkFavorites(): void {
    this.favorites$.pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((videos) => {
      this.isFavorite = videos
        .includes(this.videoData.id);
    });
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.store
        .dispatch(addFavorite({ favoriteVideoId: this.videoData.id }));
    } else {
      this.store
        .dispatch(removeFavorite({ favoriteVideoId: this.videoData.id }));
    }
  }
}
