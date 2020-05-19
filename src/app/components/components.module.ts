import { NgModule } from '@angular/core';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MoviesSliderComponent } from './movies-slider/movies-slider.component';
import { MomentjsPipe } from '../helpers/momentjs.pipe';
import { MoviesSliderItemComponent } from './movies-slider/movies-slider-item/movies-slider-item.component';
@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [MoviesListComponent, MoviesSliderComponent, MomentjsPipe, MoviesSliderItemComponent],
  exports: [MoviesListComponent, MoviesSliderComponent, MomentjsPipe, MoviesSliderItemComponent],
})
export class ComponentsModule {}
