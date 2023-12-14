import { TestBed } from '@angular/core/testing';
import { YoutubeHeaderDataSharingService } from './youtube-header-data-sharing.service';
import { ISort } from '../models/search/sort-params.model';

describe('YoutubeHeaderDataSharingService', () => {
  let service: YoutubeHeaderDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeHeaderDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update and retrieve search term correctly', () => {
    const newSearchTerm = 'testSearchTerm';
    service.updSearchTerm(newSearchTerm);
    expect(service.currentSearchTerm()).toEqual(newSearchTerm);
  });

  it('should update and retrieve sort parameters correctly', () => {
    const newSortParams: ISort = { filterType: 'date', direction: 'asc' };
    service.updSortParams(newSortParams);
    expect(service.currentSortParams()).toEqual(newSortParams);
  });

  it('should update and retrieve keyword correctly', () => {
    const newKeyword = 'testKeyword';
    service.updKeyword(newKeyword);
    expect(service.currentKeyword()).toEqual(newKeyword);
  });

  it('should update and retrieve sorting open state correctly', () => {
    const isOpen = true;
    service.updSortingOpenState(isOpen);
    expect(service.currentSortingOpenState()).toEqual(isOpen);
  });
});
