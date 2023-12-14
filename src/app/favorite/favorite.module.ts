import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';
import { FavCardComponent } from './components/fav-card/fav-card.component';

const routes: Routes = [
  { path: '', component: FavoritePageComponent },
];

const MATERIAL_IMPORTS = [
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    FavoritePageComponent,
    FavCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MATERIAL_IMPORTS
  ]
})
export class FavoriteModule { }
