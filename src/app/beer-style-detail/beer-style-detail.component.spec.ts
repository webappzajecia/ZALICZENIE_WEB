import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerStyleDetailComponent } from './beer_style-detail.component';

describe('BeerStyleDetailComponent', () => {
  let component: BeerStyleDetailComponent;
  let fixture: ComponentFixture<BeerStyleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerStyleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerStyleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
