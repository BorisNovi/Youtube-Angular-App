import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/youtube/services/api.service';
import { addCustomVideo, getVideos, getVideosSuccess } from '../actions/videos.actions';
import { addCustomId } from '../actions/custom.actions';
import { addRegularId } from '../actions/regular.actions';
import { setPageTokens } from '../actions/pageTokens.actions';

@Injectable()

export class VideosEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {}

  // eslint-disable-next-line arrow-body-style
  fetchItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVideos),
      switchMap(({ searchParams }) => this.api.getItems(searchParams)),
      switchMap((result) => [
        setPageTokens(result.tokens),
        getVideosSuccess({ videos: result.videos }),
      ]),
    );
  });

  // eslint-disable-next-line arrow-body-style
  addRegularId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVideosSuccess),
      switchMap((regularVideo) => [
        addRegularId({ regularVideoIds: Object.keys(regularVideo.videos) })
      ])
    );
  });

  // eslint-disable-next-line arrow-body-style
  addCustomId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addCustomVideo),
      switchMap((customVideo) => [
        addCustomId({ customVideoId: Object.keys(customVideo.videos)[0] })
      ])
    );
  });
}
