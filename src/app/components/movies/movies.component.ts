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
  public expandedRows: any;
  public movieCredits: any;

  constructor(private moviesService: MoviesService) {
    this.movieExpanded = false;
    this.expandedRows = {};
    this.movieCredits = {}

  }

  ngOnInit() {

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
    this.moviesService.getMovieCredits(event.data.id).subscribe(res=>{
      console.log(res);
      this.movieCredits = res;
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
    for (let crewMember of movieCredits.crew) {
      if (crewMember.job === 'Director') {
        return crewMember.name;
      }
    }
  }
}
