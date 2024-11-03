import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  //url for retrieving countries from rest api
  private countryUrl = 'http://localhost:8080/api/countries';
  //base url for retrieving states based on countries
  private stateUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  //method for retrieving countries from api and mapping it into Country class object
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponceCountries>(this.countryUrl).pipe(
      map(responce => responce._embedded.countries)
    );
  }

  //method for getting states based on country in the parameter
  getStates(theCountryCode: string): Observable<State[]> {
    //building search url for the states in the country
    const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponceStates>(searchStateUrl).pipe(
      map(responce => responce._embedded.states)
    );
  }

  //method for giving month data
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  //method for giving year data
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }
}

//interfaces for mapping
interface GetResponceCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponceStates {
  _embedded: {
    states: State[];
  }
}