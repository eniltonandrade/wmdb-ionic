import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { TmdbService } from 'src/app/services/tmdb.service';
import { MovieTmdb } from 'src/app/models/movieTmdb.model';
import { CastTmdb } from 'src/app/models/castTmdb.model';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/people/people.service';
import { PersonTmdb } from 'src/app/models/personTmdb.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  constructor(private tmdb: TmdbService, private route: ActivatedRoute, private peopleService: PeopleService) {}
  person: PersonTmdb;
  castOrderedMovies: MovieTmdb[];
  profilePicPath = `${environment.TMDB.images.base_url}${environment.TMDB.images.profile_sizes.w185}`;
  moviePosterPath = `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w185}`;

  ngOnInit() {
    const tmdbId = 74568;
    this.tmdb.getPersonDetails(tmdbId).subscribe((response) => {
      this.person = response;
      this.castOrderedMovies = this.orderList(this.person.movie_credits.cast);
    });
  }

  orderList(list: MovieTmdb[]) {
    return list
      .filter((item) => {
        const now = new Date();
        return new Date(item.release_date).valueOf() < now.valueOf();
      })
      .sort((a, b) => {
        const dateA = new Date(a.release_date).valueOf();
        const dateB = new Date(b.release_date).valueOf();
        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
      });
  }
}
