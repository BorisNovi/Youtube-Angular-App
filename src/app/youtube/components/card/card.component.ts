import {
  Component, DestroyRef, Input, OnInit, inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addFavorite, removeFavorite } from '../../../NgRx/actions/favorite.actions';
import { selectFavorites } from '../../../NgRx/selectors/favorite.selectors';
import { removeCustomVideo } from '../../../NgRx/actions/videos.actions';
import { VideoItemModel } from '../../models/search/video-item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() searchItem!: VideoItemModel;

  isFavorite = false;

  isCustom = false;

  favorites$ = this.store.select(selectFavorites);
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.checkFavorites();
    this.isCustom = this.searchItem?.kind === 'custom';
  }

  checkFavorites(): void {
    this.favorites$.pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((videos) => {
      this.isFavorite = videos
        .includes(this.searchItem.id);
    });
  }

  deleteCustom(): void {
    if (this.isCustom) {
      this.store.dispatch(removeCustomVideo({ id: this.searchItem.id }));
    }
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.store
        .dispatch(addFavorite({ favoriteVideoId: this.searchItem.id }));
    } else {
      this.store
        .dispatch(removeFavorite({ favoriteVideoId: this.searchItem.id }));
    }
  }
}
