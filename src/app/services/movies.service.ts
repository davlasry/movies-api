import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private API_BASE_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'c0bbcd88e537a933edf69ac251f54bab';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http
      .get<any>(`${this.API_BASE_URL}/movie/popular?api_key=${this.API_KEY}`)
      .pipe(map(movies => movies.results));
  }

  getMovie(movieID): Observable<any> {
    return this.http.get<any>(
      `${this.API_BASE_URL}/movie/${movieID}?api_key=${this.API_KEY}`
    );
  }
}
