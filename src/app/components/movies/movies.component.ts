import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public popularMovies: Movie[];
  public cols: any[];
  public movieExpanded: boolean;
  public expandedRows = {};

  constructor(private moviesService: MoviesService) {
    this.movieExpanded = false;
  }

  ngOnInit() {
    this.moviesService.getMovie(47933).subscribe(res => {
      console.log(res);
    });

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'id', header: 'Code' },
      { field: 'release_date', header: 'Year' },
      { field: 'vote_average', header: 'Rating' },
    ];

    this.moviesService.getPopularMovies().subscribe(res => {
      this.popularMovies = res;
      console.log(res);
    });
  }

  onRowExpand(event) {
    console.log('EXPAND', event);
    console.log(this.expandedRows);
    this.movieExpanded = false;
    this.expandedRows = { [event.data.title]: true };
  }

  onRowCollapse(event) {
    console.log('COLLAPSE', event);
    console.log(this.expandedRows);
    this.movieExpanded = false;
  }

  onClickMovieTitle() {
    this.movieExpanded = true;
  }

  getYearFromDate(date) {
    return date.split('-')[0];
  }
}
