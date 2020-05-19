import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private API_URL = environment.api_url;
  constructor(private http: HttpClient) {}

  getList(limit: number) {
    return this.http.get<{ status: boolean; data: any }>(`${this.API_URL}movies?limit=${limit}`).pipe(
      map((res) => res.data.movies),
      shareReplay()
    );
  }
  getTimeWatched() {
    return this.http.get<{ status: boolean; result: any }>(`${this.API_URL}stats/time`).pipe(
      map((res) => res.result),
      shareReplay()
    );
  }

  getCountWatched() {
    return this.http.get<{ status: boolean; result: any }>(`${this.API_URL}stats/count`).pipe(
      map((res) => res.result),
      shareReplay()
    );
  }
}
