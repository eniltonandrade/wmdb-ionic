import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private API_URL = environment.api_url;
  constructor(private http: HttpClient) {}

  getMoviesByPerson(tmdbId: number) {
    return this.http.get<{ status: boolean; data: any }>(`${this.API_URL}people/${tmdbId}`).pipe(
      map((res) => res.data.movies),
      shareReplay()
    );
  }
}
