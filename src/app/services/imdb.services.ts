import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  private apiKey = environment.TMDB.apiKey;
  private apiUrl =
    'https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=c4eb5528&';

  constructor(private http: HttpClient) {}

  getScore(imdbId: string) {
    return this.http.get<{ imdbRating: any }>(`${this.apiUrl}i=${imdbId}`);
  }
}
