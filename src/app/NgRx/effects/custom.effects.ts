import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { removeCustomVideo } from '../actions/videos.actions';
import { removeCustomId } from '../actions/custom.actions';

@Injectable()

export class CustomEffects {
  constructor(
    private actions$: Actions,
  ) {}

  // eslint-disable-next-line arrow-body-style
  removeCustomId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeCustomVideo),
      switchMap((customVideoIdPayload) => [
        removeCustomId({ customVideoId: customVideoIdPayload.id })
      ])
    );
  });
}
