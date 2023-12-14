import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormBuilder, Validators, FormArray
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCustomVideo } from 'src/app/NgRx/actions/videos.actions';
import { VideoItemModel } from 'src/app/youtube/models/search/video-item.model';

@Component({
  selector: 'app-create-card-form',
  templateUrl: './create-card-form.component.html',
  styleUrls: ['./create-card-form.component.scss']
})
export class CreateCardFormComponent implements OnInit {
  public cardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', Validators.maxLength(255)],
      img: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('^https://www.youtube.com/watch\\?v=([a-zA-Z0-9_-]{11})$')]],
      date: ['', [Validators.required]],
      tags: this.formBuilder.array([
        this.createTag()
      ])
    });
  }

  createTag(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  addTag(): void {
    const arr = this.cardForm.get('tags') as FormArray;

    if (arr.length >= 5) return;

    arr.push(this.createTag());
  }

  removeTag(i: number): void {
    const arr = (this.cardForm.get('tags') as FormArray);

    if (arr.length <= 1) return;

    arr.removeAt(i);
  }

  get tags(): FormArray<FormControl> {
    return this.cardForm.get('tags') as FormArray;
  }

  onReset(): void {
    const arr = (this.cardForm.get('tags') as FormArray);

    while (arr.length > 1) {
      arr.removeAt(1);
    }
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      const link = (this.cardForm.value.link) as string;
      const id = link.split('=')[1];

      const formattedVideo: VideoItemModel = {
        kind: 'custom',
        id,
        snippet: {
          publishedAt: this.cardForm.value.date,
          title: this.cardForm.value.title,
          description: this.cardForm.value.description,
          thumbnails: {
            default: { url: this.cardForm.value.img },
            standard: { url: this.cardForm.value.img }
          },
          tags: this.cardForm.value.tags,
        },
        statistics: {
          viewCount: '',
          likeCount: '',
          dislikeCount: '',
          favoriteCount: '',
          commentCount: '',
        }
      };

      const videoPayload = {
        [id]: formattedVideo,
      };

      this.store.dispatch(addCustomVideo({ videos: videoPayload }));
    }
  }
}
