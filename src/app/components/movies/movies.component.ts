import { Component, OnInit } from '@angular/core';
import { Movie, PopularMovie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { TableColumns } from 'src/app/models/data-table.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public popularMovies: PopularMovie[];
  public cols: TableColumns[];
  public movieExpanded: boolean;
  public expandedRows: any;
  public movieInfo: Movie;
  public currentPage: number;

  constructor(private moviesService: MoviesService) {
    this.movieExpanded = false;
    this.expandedRows = {};
    this.currentPage = 1;
  }

  ngOnInit() {
    // this.moviesService.getMovie(429617).subscribe(res => {
    //   console.log(res);
    // });

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'id', header: 'Code' },
      { field: 'release_date', header: 'Year' },
      { field: 'vote_average', header: 'Rating' }
    ];

    this.getPopularMovies();
    setInterval(() => this.getPopularMovies(), 300000);
  }

  getPopularMovies() {
    this.moviesService.getPopularMovies(this.currentPage).subscribe(res => {
      this.popularMovies = res;
      this.currentPage = this.currentPage + 1;
      console.log(res);
    });
  }

  onRowExpand(event) {
    console.log('EXPAND', event);
    console.log(this.expandedRows);
    this.movieExpanded = false;
    this.expandedRows = { [event.data.title]: true };
    this.moviesService.getMovie(event.data.id).subscribe(res => {
      console.log(res);
      this.movieInfo = res;
    });
  }

  onRowCollapse(event) {
    console.log('COLLAPSE', event);
    console.log(this.expandedRows);
    this.movieExpanded = false;
  }

  onClickMovieTitle() {
    this.movieExpanded = !this.movieExpanded;
  }

  getYearFromDate(date) {
    return date.split('-')[0];
  }

  getDirectorName(movieCredits) {
    for (const crewMember of movieCredits.crew) {
      if (crewMember.job === 'Director') {
        return crewMember.name;
      }
    }
  }

  formatDuration(minutesNumber) {
    const hours = Math.floor(minutesNumber / 60);
    const minutes = minutesNumber % hours;

    let formatedMinutes;
    if (minutes < 10) {
      formatedMinutes = `0${minutes}`;
    }

    return `${hours}:${formatedMinutes}`;
  }
}
