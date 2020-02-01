import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BeerCompany } from './beerCompany';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class BeerCompanyService {

  private beer-companiesUrl = 'api/beer-companies';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET beer-companies from the server */
  getBeers-companies (): Observable<BeerCompany[]> {
    return this.http.get<BeerCompany[]>(this.beer-companiesUrl)
      .pipe(
        tap(_ => this.log('fetched beer-companies')),
        catchError(this.handleError<BeerCompany[]>('getBeers-companies', []))
      );
  }

  /** GET beerCompany by id. Return `undefined` when id not found */
  getBeerCompanyNo404<Data>(id: number): Observable<BeerCompany> {
    const url = `${this.beer-companiesUrl}/?id=${id}`;
    return this.http.get<BeerCompany[]>(url)
      .pipe(
        map(beer-companies => beer-companies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} beerCompany id=${id}`);
        }),
        catchError(this.handleError<BeerCompany>(`getBeerCompany id=${id}`))
      );
  }

  /** GET beerCompany by id. Will 404 if id not found */
  getBeerCompany(id: number): Observable<BeerCompany> {
    const url = `${this.beer-companiesUrl}/${id}`;
    return this.http.get<BeerCompany>(url).pipe(
      tap(_ => this.log(`fetched beerCompany id=${id}`)),
      catchError(this.handleError<BeerCompany>(`getBeerCompany id=${id}`))
    );
  }

  /* GET beer-companies whose name contains search term */
  searchBeers-companies(term: string): Observable<BeerCompany[]> {
    if (!term.trim()) {
      // if not search term, return empty beerCompany array.
      return of([]);
    }
    return this.http.get<BeerCompany[]>(`${this.beer-companiesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found beer-companies matching "${term}"`)),
      catchError(this.handleError<BeerCompany[]>('searchBeers-companies', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new beerCompany to the server */
  addBeerCompany (beerCompany: BeerCompany): Observable<BeerCompany> {
    return this.http.post<BeerCompany>(this.beer-companiesUrl, beerCompany, this.httpOptions).pipe(
      tap((newBeerCompany: BeerCompany) => this.log(`added beerCompany w/ id=${newBeerCompany.id}`)),
      catchError(this.handleError<BeerCompany>('addBeerCompany'))
    );
  }

  /** DELETE: delete the beerCompany from the server */
  deleteBeerCompany (beerCompany: BeerCompany | number): Observable<BeerCompany> {
    const id = typeof beerCompany === 'number' ? beerCompany : beerCompany.id;
    const url = `${this.beer-companiesUrl}/${id}`;

    return this.http.delete<BeerCompany>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted beerCompany id=${id}`)),
      catchError(this.handleError<BeerCompany>('deleteBeerCompany'))
    );
  }

  /** PUT: update the beerCompany on the server */
  updateBeerCompany (beerCompany: BeerCompany): Observable<any> {
    return this.http.put(this.beer-companiesUrl, beerCompany, this.httpOptions).pipe(
      tap(_ => this.log(`updated beerCompany id=${beerCompany.id}`)),
      catchError(this.handleError<any>('updateBeerCompany'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BeerCompanyService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BeerCompanyService: ${message}`);
  }
}
