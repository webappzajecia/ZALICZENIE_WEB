import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { BeerCompany } from '../beerCompany';
import { BeerCompanyService } from '../beerCompany.service';

@Component({
  selector: 'app-beerCompany-search',
  templateUrl: './beerCompany-search.component.html',
  styleUrls: [ './beerCompany-search.component.css' ]
})
export class beerCompanySearchComponent implements OnInit {
  beer-companies$: Observable<beerCompany[]>;
  private searchTerms = new Subject<string>();

  constructor(private beerCompanyService: HBeerCompanyService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.beer-companies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.beerCompanyService.searchbeer-companies(term)),
    );
  }
}
