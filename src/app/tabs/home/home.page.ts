import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable, combineLatest, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { MovieTmdb } from 'src/app/models/movieTmdb.model';
import { ToastController } from '@ionic/angular';

interface HomeData {
  recentlyWatched: MovieTmdb[];
  timeWatched: {
    months: number;
    days: number;
    hours: number;
    minutes: number;
  };
  movieCount: {
    count: number;
    year: number;
    month: number;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data$: Observable<HomeData>;
  error: boolean;
  constructor(private homeService: HomeService, private toastCtrl: ToastController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const movies$ = this.homeService.getList(5);
    const stats$ = this.homeService.getTimeWatched();
    const count$ = this.homeService.getCountWatched();

    this.data$ = combineLatest([movies$, stats$, count$]).pipe(
      catchError((err) => {
        this.presentToast(err.message);
        this.error = true;
        return throwError(err);
      }),
      map(([recentlyWatched, timeWatched, movieCount]) => {
        return {
          recentlyWatched,
          timeWatched,
          movieCount,
        };
      })
    );

    // FOR OPTION
    //
    // forkJoin([
    //   this.homeService.getList(5),
    //   this.homeService.getTimeWatched(),
    //   this.homeService.getCountWatched(),
    // ]).subscribe(([movies, stats, count]) => {
    //   this.movies = movies.data.movies;
    //   this.movieCount = count.result;
    //   this.stats = stats.result;
    //   this.isLoading = false;
    //   console.log('end', new Date());
    // });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }
}
