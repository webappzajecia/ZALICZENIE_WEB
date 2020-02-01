import { Component, OnInit } from '@angular/core';

import { BeerCompany } from '../BeerCompany';
import { BeerCompanyService } from '../BeerCompany.service';

@Component({
  selector: 'app-beer-companies',
  templateUrl: './beer-companies.component.html',
  styleUrls: ['./beer-companies.component.css']
})
export class beer-companiesComponent implements OnInit {

beer-companies: BeerCompany[];

  constructor(private beerCompanyService: BeerCompanyService) { }

  ngOnInit() {
    this.getBeer-companies();
  }

  getBeer-copmanies(): void {
    this.beerCompanyService.getbeer-companies()
    .subscribe(beer-companies => this.beer-companies = beer-companies);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.beerCompanyService.addbeerCompany({ name } as beerCompany)
      .subscribe(beerCompany => {
        this.beer-companies.push(beerCompany);
      });
  }

  delete(beerCompany: beerCompany): void {
    this.beer-companies = this.beer-companies.filter(h => h !== beerCompany);
    this.beerCompanyService.deletebeerCompany(beerCompany).subscribe();
  }

}
