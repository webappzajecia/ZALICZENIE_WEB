import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCompaniesComponent } from './beer-companies.component';

describe('BeerCompaniesComponent', () => {
  let component: BeerCompaniesComponent;
  let fixture: ComponentFixture<BeerCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
