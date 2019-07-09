import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  popularMovies: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovie(47933).subscribe(res => {
      console.log(res);
    });

    this.moviesService.getPopularMovies().subscribe(res => {
      this.popularMovies = res;
      console.log(res);
    });
  }
}
