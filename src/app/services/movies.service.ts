import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopularMovies, Movie, PopularMovie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private API_BASE_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'c0bbcd88e537a933edf69ac251f54bab';

  constructor(private http: HttpClient) {}

  getPopularMovies(pageNumber): Observable<PopularMovie[]> {
    return this.http
      .get<PopularMovies>(
        `${this.API_BASE_URL}/movie/popular?api_key=${
          this.API_KEY
        }&page=${pageNumber}`
      )
      .pipe(map(movies => movies.results));
  }

  getMovie(movieID): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.API_BASE_URL}/movie/${movieID}?api_key=${
        this.API_KEY
      }&append_to_response=credits`
    );
  }
}
