import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DestroyRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { addFavorite, removeFavorite } from '../../../NgRx/actions/favorite.actions';
import { removeCustomVideo } from '../../../NgRx/actions/videos.actions';
import { CardComponent } from './card.component';
import { VideoItemModel } from '../../models/search/video-item.model';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { PublishedIndicatorDirective } from '../../directives/published-indicator.directive';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let store: MockStore;

  const searchItem = {
    kind: 'custom',
    id: '1',
    snippet: {
      publishedAt: '',
      title: '',
      description: '',
      thumbnails: {
        default: {
          url: ''
        },
        standard: {
          url: ''
        }
      },
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

  const initialState = {
    favorites: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, PublishedIndicatorDirective],
      imports: [
        StoreModule.forRoot({}, {}),
        MatIconModule,
        CustomButtonComponent,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: DestroyRef, useValue: {} }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.searchItem = searchItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkFavorites on ngOnInit', () => {
    jest.spyOn(component, 'checkFavorites');
    component.ngOnInit();
    expect(component.checkFavorites).toHaveBeenCalled();
  });

  it('should set isCustom to true if searchItem is custom', () => {
    const customSearchItem: VideoItemModel = searchItem;
    component.searchItem = customSearchItem;
    component.ngOnInit();
    expect(component.isCustom).toBeTruthy();
  });

  it('should call removeCustomVideo when deleteCustom is called for a custom video', () => {
    component.isCustom = true;
    jest.spyOn(store, 'dispatch');

    component.searchItem = searchItem;

    component.deleteCustom();
    expect(store.dispatch).toHaveBeenCalledWith(removeCustomVideo({ id: component.searchItem.id }));
  });

  it('should dispatch addFavorite or removeFavorite based on isFavorite when toggleFavorite is called', () => {
    jest.spyOn(store, 'dispatch');

    // Case 1: isFavorite is true
    component.isFavorite = true;
    component.toggleFavorite();
    expect(store.dispatch)
      .toHaveBeenCalledWith(removeFavorite({ favoriteVideoId: component.searchItem.id }));

    // Case 2: isFavorite is false
    component.isFavorite = false;
    component.toggleFavorite();
    expect(store.dispatch)
      .toHaveBeenCalledWith(addFavorite({ favoriteVideoId: component.searchItem.id }));
  });
});
