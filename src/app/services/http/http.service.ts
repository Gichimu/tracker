import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from 'src/app/case';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private uri = 'https://corona.lmao.ninja/v3/covid-19/countries/'
  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.uri);
  }

  getByCountry(country): Observable<Case>{
    return this.http.get<Case>(this.uri + country);
  }
}
