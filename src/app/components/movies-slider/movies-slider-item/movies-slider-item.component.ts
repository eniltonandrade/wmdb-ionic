import { Component, OnInit, Input } from '@angular/core';
import { MovieTmdb } from 'src/app/models/movieTmdb.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies-slider-item',
  templateUrl: './movies-slider-item.component.html',
  styleUrls: ['./movies-slider-item.component.scss'],
})
export class MoviesSliderItemComponent implements OnInit {
  @Input() movie: MovieTmdb;
  @Input() hasText: boolean;
  @Input() isTmdb: boolean;

  posterUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/`;
  posterImg: string;
  imgPlaceholder =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmE4dCrfq0l3qfFoGV7KrQOlirVVaCmpDa1-B7Fn_SBbf8g7it';
  constructor(private router: Router) {}

  onClickPoster(id: number) {
    this.router.navigate(['/movie-details', id]);
  }

  ngOnInit() {
    if (!this.isTmdb) {
      this.movie.id = this.movie.tmdbId;
    }
    if (!this.movie.poster_path) {
      this.posterImg = this.imgPlaceholder;
    } else {
      this.posterImg = this.posterUrl + this.movie.poster_path;
    }
  }
}
