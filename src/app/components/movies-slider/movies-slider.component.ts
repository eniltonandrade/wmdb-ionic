import { Component, OnInit, Input } from '@angular/core';
import { MovieTmdb } from 'src/app/models/movieTmdb.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-slider',
  templateUrl: './movies-slider.component.html',
  styleUrls: ['./movies-slider.component.scss'],
})
export class MoviesSliderComponent implements OnInit {
  @Input() movieList: MovieTmdb;
  @Input() hasText: boolean;
  @Input() isTmdb: boolean;

  posterUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/`;
  slideOpts = {
    initialSlide: 0,
    spaceBetween: 16,
    slidesPerView: 6.5,
    clickable: true,
    breakpoints: {
      400: {
        slidesPerView: 2.5,
      },
      600: {
        slidesPerView: 2.5,
      },
      800: {
        slidesPerView: 3.5,
      },
      1000: {
        slidesPerView: 4.5,
      },
      1180: {
        slidesPerView: 5.5,
      },
    },
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickPoster(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
}
