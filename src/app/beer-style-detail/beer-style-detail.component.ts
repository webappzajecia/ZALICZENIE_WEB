import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BeerStyle }         from '../beer_style';
import { BeerStyleService }  from '../beer_style.service';

@Component({
  selector: 'app-beer_style-detail',
  templateUrl: './beer_style-detail.component.html',
  styleUrls: [ './beer_style-detail.component.css' ]
})
export class BeerStyleDetailComponent implements OnInit {
  beer_style: BeerStyle;

  constructor(
    private route: ActivatedRoute,
    private beer_styleService: BeerStyleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBeerStyle();
  }

  getBeerStyle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.beer_styleService.getBeerStyle(id)
      .subscribe(beer_style => this.beer_style = beer_style);
  }

  goBack(): void {
    this.location.back();
  }

save(): void {
    this.beer_styleService.updateBeerStyle(this.beer_style)
      .subscribe(() => this.goBack());
  }
}
