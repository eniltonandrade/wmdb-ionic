import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { MovieTmdb } from '../models/movieTmdb.model';
import { environment } from 'src/environments/environment';
import { map, mergeMap } from 'rxjs/operators';
import { ActionSheetController, ModalController, IonDatetime } from '@ionic/angular';
import { ImdbService } from '../services/imdb.services';
import { CastListPage } from '../modal/cast-list/cast-list.page';
import { MovieDetailsService } from './movie-details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage {
  movie: MovieTmdb;
  watchedDate: Date;
  today = new Date();
  producers = [];
  writers = [];
  directors = [];
  imgBaseUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.backdrop_sizes.w780}/`;
  profilePicUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.profile_sizes.w185}/`;
  imgPlaceHolder = 'http://via.placeholder.com/154x218?text=Not+avaliable';
  posterUrl: string;
  backdropUrl: string;
  showToolbar = false;
  imdbScore: string;
  isLoading = true;
  watchedData: any;
  customMonthShortNames: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'aug', 'set', 'out', 'nov', 'dez'];
  @ViewChild('startTimePicker', { static: true }) startTimePicker: IonDatetime;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    public actionSheetController: ActionSheetController,
    private imdb: ImdbService,
    public modalController: ModalController,
    private movieDetailsService: MovieDetailsService
  ) { }

  ionViewWillEnter() {
    console.log(this.startTimePicker);
    // tslint:disable-next-line: radix
    const movieId = +this.route.snapshot.paramMap.get('id');
    this.tmdb
      .getMovie(movieId)
      .pipe(
        map((response) => {
          this.movie = response;
          this.backdropUrl = this.imgBaseUrl + this.movie.backdrop_path;
          this.directors = this.movie.casts.crew.filter((x) => x.job === 'Director');
          this.posterUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.poster_sizes.w154}/${this.movie.poster_path}`;
        }),
        mergeMap(() => this.imdb.getScore(this.movie.imdb_id))
      )
      .subscribe((imdbData) => {
        if (!isNaN(imdbData.imdbRating)) {
          this.movie.imdbScore = imdbData.imdbRating;
        } else {
          this.movie.imdbScore = 0;
        }
      });

    this.movieDetailsService.getMovie(movieId).subscribe((res) => {
      this.watchedDate = res.datetime;
      this.isLoading = false;
    });
  }

  onScroll($event: CustomEvent<any>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

  async presentCastListModal() {
    const modal = await this.modalController.create({
      component: CastListPage,
      componentProps: {
        casts: this.movie.casts.cast,
        title: this.movie.title,
      },
    });
    return await modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Quando Você Assistiu?',
      buttons: [
        {
          text: 'Agora Mesmo',
          icon: 'calendar-outline',
          handler: () => {
            this.watchedDate = new Date();
            this.setWatched();
          },
        },
        {
          text: 'Outra Data',
          icon: 'calendar-outline',
          handler: () => {
            this.startTimePicker.open();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => { },
        },
      ],
    });
    await actionSheet.present();
  }
  dateChanged(date) {
    this.watchedDate = new Date(date.detail.value);
    this.setWatched();
  }

  setWatched() {
    console.log('movie', this.movie);
    console.log('watchedDate', this.watchedDate);
    this.movieDetailsService.setWatched(this.movie, this.watchedDate).subscribe((response) => {
      console.log(response);
    });
  }
}
