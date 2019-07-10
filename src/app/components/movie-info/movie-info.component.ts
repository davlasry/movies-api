import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  @Input() 'movieInfo': any;

  constructor() {}

  ngOnInit() {}

  get data() {
    return [this.movieInfo];
  }

  formatDuration(minutesNumber) {
    if (isNaN(minutesNumber)) {
      return;
    }

    const hours = Math.floor(minutesNumber / 60);
    const minutes = minutesNumber % hours;

    let formatedMinutes;
    if (minutes < 10) {
      formatedMinutes = `0${minutes}`;
    }

    return `${hours}:${formatedMinutes}`;
  }

  getDirectorName(movieCredits) {
    for (const crewMember of movieCredits.crew) {
      if (crewMember.job === 'Director') {
        return crewMember.name;
      }
    }
  }
}
