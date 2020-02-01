import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCompaniesSearchComponent } from './beer-companies-search.component';

describe('BeerCompaniesSearchComponent', () => {
  let component: BeerCompaniesSearchComponent;
  let fixture: ComponentFixture<BeerCompaniesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerCompaniesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCompaniesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
