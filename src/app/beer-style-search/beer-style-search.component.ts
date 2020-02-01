import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { BeerStyle } from '../beer_style';
import { BeerStyleService } from '../beer_style.service';

@Component({
  selector: 'app-beer_style-search',
  templateUrl: './beer_style-search.component.html',
  styleUrls: [ './beer_style-search.component.css' ]
})
export class BeerStyleSearchComponent implements OnInit {
  beer_styles$: Observable<BeerStyle[]>;
  private searchTerms = new Subject<string>();

  constructor(private beer_styleService: BeerStyleService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.beer_styles$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.beer_styleService.searchBeerStyles(term)),
    );
  }
}
