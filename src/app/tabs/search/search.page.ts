import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TmdbService } from 'src/app/services/tmdb.service';
import { MovieTmdb } from 'src/app/models/movieTmdb.model';
import { CastTmdb } from 'src/app/models/castTmdb.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  query = '';
  results: any;
  movieResults: MovieTmdb[];
  personResults: CastTmdb[];
  popularMovies: MovieTmdb[];
  nowPlaying: MovieTmdb[];

  isLoading = true;
  isSearching = false;

  // Slide OPS

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {
    this.tmdb.getPopularMovies().subscribe((response) => {
      this.popularMovies = response.results;
    });

    this.tmdb.getNowPlayingMovies().subscribe((response) => {
      this.nowPlaying = response.results;
      this.isLoading = false;
    });
  }

  searchMovie() {
    this.isLoading = true;
    this.isSearching = true;
    if (this.query.length > 0) {
      this.tmdb.doMultiSearch(this.query).subscribe((response) => {
        this.results = response;
        console.log(this.results);
        this.movieResults = this.results.filter((x) => x.media_type === 'movie');
        this.personResults = this.results.filter((x) => x.media_type === 'person');
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      this.isSearching = false;
    }
  }

  clearInput() {
    this.query = '';
    this.results = [];
    this.isLoading = false;
    this.isSearching = false;
  }
}
