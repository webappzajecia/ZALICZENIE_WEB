import { Component, OnInit } from '@angular/core';
import { BeerStyle } from '../beer-style'

@Component({
  selector: 'app-beer-styles',
  templateUrl: './beer-styles.component.html',
  styleUrls: ['./beer-styles.component.css']
})
export class BeerStylesComponent implements OnInit {
  beer_style: BeerStyle = {
    id: 1,
    name: 'IPA'
  };


  constructor(private beer_styleService: BeerStyleService) { }

  ngOnInit() {
  	this.getBeerStyles();
  }

  beer_styles: BeerStyle[];

  getBeerStyles(): void {
    this.beer_styleService.getBeerStyles()
    .subscribe(beer_styles => this.beer_styles = beer_styles);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.beer_styleService.addBeerStyle({ name } as BeerStyle)
      .subscribe(beer_style => {
        this.beer_styles.push(beer_style);
      });
  }

  delete(beer_style: BeerStyle): void {
    this.beer_styles = this.beer_styles.filter(h => h !== beer_style);
    this.beer_styleService.deleteBeerStyle(beer_style).subscribe();
  }
}
