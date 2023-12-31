import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardComponent } from './components/card/card.component';
import { MainComponent } from './pages/main/main.component';
import { SearchResultsBlockComponent } from './components/search-results-block/search-results-block.component';
import { PublishedIndicatorDirective } from './directives/published-indicator.directive';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SortingCriteriaBlockComponent } from './components/sorting-criteria-block/sorting-criteria-block.component';
import { ApiService } from './services/api.service';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';

const MATERIAL_IMPORTS = [
  MatIconModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatPaginatorModule,
];

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'detail/:id', component: DetailComponent },
];

@NgModule({
  declarations: [
    MainComponent,
    SortingCriteriaBlockComponent,
    SearchResultsBlockComponent,
    CardComponent,
    PublishedIndicatorDirective,
    SearchPipe,
    SortPipe,
    FilterPipe,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    CustomButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MATERIAL_IMPORTS,
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ]
})
export class YoutubeModule { }
