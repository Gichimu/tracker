import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from 'src/app/case';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private tweetUri = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=WHO';
  private uri = 'https://corona.lmao.ninja/v3/covid-19/countries/'
  constructor(private readonly http: HttpClient) { }

  getTweets(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAKKwIwEAAAAAbny7tdwe0TzD3njR%2BTBn70l61zo%3Dt9ChiWyUYKKr1mRH8XeO39CPb9MAY7NlQW5OJDVtpes4lzrJD3",
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': 'true',
    });

    return this.http.get(this.tweetUri, {headers})                                                                                                                                                                               
      
  }

  getAll(): Observable<any>{
    return this.http.get(this.uri);
  }

  getByCountry(country): Observable<Case>{
    return this.http.get<Case>(this.uri + country);
  }
}
