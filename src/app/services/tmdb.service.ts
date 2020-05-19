import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieTmdb } from '../models/movieTmdb.model';
import { PersonTmdb } from '../models/personTmdb.model';
import { map } from 'rxjs/operators';

interface SearchAllResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey = environment.TMDB.apiKey;
  private apiUrl = environment.TMDB.apiUrl;
  private apiLang = environment.TMDB.apiLang;

  constructor(private http: HttpClient) {}

  searchMovie(query: string) {
    return this.http.get<any>(`${this.apiUrl}search/movie?api_key=${this.apiKey}${this.apiLang}&query=${query}`);
  }

  doMultiSearch(query: string) {
    return this.http
      .get<any>(`${this.apiUrl}search/multi?api_key=${this.apiKey}${this.apiLang}&query=${query}&page=1&region=pt-BR`)
      .pipe(map((res) => res.results));
  }

  getPopularMovies() {
    return this.http.get<any>(`${this.apiUrl}movie/popular?api_key=${this.apiKey}${this.apiLang}&page=1&region=BR`);
  }

  getNowPlayingMovies() {
    return this.http.get<any>(`${this.apiUrl}movie/now_playing?api_key=${this.apiKey}${this.apiLang}&page=1&region=BR`);
  }

  getMovie(id: number) {
    return this.http.get<MovieTmdb>(
      `${this.apiUrl}movie/${id}?api_key=${this.apiKey}${this.apiLang}&append_to_response=casts`
    );
  }

  getPersonDetails(id: number) {
    return this.http.get<PersonTmdb>(
      `${this.apiUrl}person/${id}?api_key=${this.apiKey}${this.apiLang}&append_to_response=movie_credits,images`
    );
  }
}
