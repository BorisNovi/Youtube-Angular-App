import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SortingCriteriaBlockComponent } from './sorting-criteria-block.component';
import { YoutubeHeaderDataSharingService } from '../../services/youtube-header-data-sharing.service';

describe('SortingCriteriaBlockComponent', () => {
  let component: SortingCriteriaBlockComponent;
  let fixture: ComponentFixture<SortingCriteriaBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingCriteriaBlockComponent],
      providers: [YoutubeHeaderDataSharingService],
      imports: [MatButtonToggleModule]
    });

    fixture = TestBed.createComponent(SortingCriteriaBlockComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sort direction on sort click', () => {
    const initialSortDirection = component.sortDirection;

    component.onSortClick();

    expect(component.sortDirection).toEqual(!initialSortDirection);
  });

  it('should update sort parameters on sort click', () => {
    const mockUpdSortParams = jest.spyOn(component.dataSharingService, 'updSortParams');
    const expectedSortDirection = component.sortDirection ? 'asc' : 'desc';

    component.onSortClick();

    expect(mockUpdSortParams).toHaveBeenCalledWith({
      filterType: component.filterType,
      direction: expectedSortDirection,
    });
  });

  it('should update keyword on keyword change', () => {
    const mockUpdKeyword = jest.spyOn(component.dataSharingService, 'updKeyword');
    const keyword = 'testKeyword';

    component.onKeywordChange(keyword);

    expect(mockUpdKeyword).toHaveBeenCalledWith(keyword);
  });
});
