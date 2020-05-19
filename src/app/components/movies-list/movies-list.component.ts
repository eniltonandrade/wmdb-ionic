import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('movies') movies: any[];
  // tslint:disable-next-line: no-input-rename
  @Input('grid') grid: boolean;

  posterUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/`;

  imgPlaceholder =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmE4dCrfq0l3qfFoGV7KrQOlirVVaCmpDa1-B7Fn_SBbf8g7it';

  constructor() {}

  ngOnInit() {}
}
