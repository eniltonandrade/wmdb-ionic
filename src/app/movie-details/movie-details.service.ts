import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private API_URL = environment.api_url;
  constructor(private http: HttpClient) {}

  getMovie(id: number) {
    return this.http.get<{ status: boolean; datetime: any }>(`${this.API_URL}movies/${id}`);
  }

  setWatched(movie: any, date: any) {
    let castArray = [];
    let directorsArray = [];
    let genresArray = [];
    let companiesArray = [];

    genresArray = movie.genres.map((genres) => {
      return {
        tmdbId: genres.id,
        name: genres.name,
      };
    });

    companiesArray = movie.production_companies.map((company) => {
      return {
        tmdbId: company.id,
        name: company.name,
        logo_path: company.logo_path,
      };
    });

    castArray = movie.casts.cast.map((cast) => {
      return {
        tmdbId: cast.id,
        name: cast.name,
        profile_path: cast.profile_path,
        gender: cast.gender,
        character: cast.character,
        order: cast.order,
      };
    });

    directorsArray = movie.casts.crew
      .filter((x) => {
        return x.job === 'Director';
      })
      .map((director) => {
        return {
          gender: director.gender,
          tmdbId: director.id,
          name: director.name,
          profile_path: director.profile_path,
        };
      });

    const request = {
      tmdbId: movie.id,
      imdbId: movie.imdb_id,
      title: movie.title,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.imdbScore,
      runtime: movie.runtime,
      watchedAt: date.toString(),
      companies: companiesArray,
      user: [1],
      genres: genresArray,
      directors: directorsArray,
      cast: castArray,
    };

    return this.http.post(this.API_URL + 'movies', request);
  }
}
