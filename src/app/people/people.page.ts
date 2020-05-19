import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { PersonTmdb } from '../models/personTmdb.model';
import { environment } from 'src/environments/environment';
import { MovieTmdb } from '../models/movieTmdb.model';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  selecteTab: string;
  person: PersonTmdb;
  randomPic: number;
  castOrderedMovies: MovieTmdb[];
  crewOrderedMovies: MovieTmdb[];
  castWathedMovies: MovieTmdb[];
  isLoading = true;
  personAge: number;
  backdropPic = `${environment.TMDB.images.base_url}${environment.TMDB.images.profile_sizes.h632}`;
  profilePic = `${environment.TMDB.images.base_url}${environment.TMDB.images.profile_sizes.w185}`;
  constructor(private tmdb: TmdbService, private route: ActivatedRoute, private peopleService: PeopleService) {}

  ngOnInit() {
    this.selecteTab = 'sobre';

    const tmdbId = +this.route.snapshot.paramMap.get('id');

    this.tmdb.getPersonDetails(tmdbId).subscribe((response) => {
      this.person = response;
      console.log(this.person);
      this.crewOrderedMovies = this.orderList(this.person.movie_credits.crew);
      this.crewOrderedMovies = this.filterDirecting(this.crewOrderedMovies);
      this.castOrderedMovies = this.orderList(this.person.movie_credits.cast);
      this.personAge = new Date().getFullYear() - new Date(this.person.birthday).getFullYear();
      this.isLoading = false;
    });

    this.peopleService.getMoviesByPerson(tmdbId).subscribe((res) => {
      res.forEach((element: any) => {
        element.id = element.tmdbId;
      });
      this.castWathedMovies = res;
    });
  }

  filterDirecting(list: any) {
    return list.filter((item) => {
      return item.job === 'Director';
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

  segmentChanged(ev: any) {
    this.selecteTab = ev.detail.value;
  }
}
