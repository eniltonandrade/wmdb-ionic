import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';

import { MovieDetailsPage } from './movie-details.page';
import { CastListPage } from '../modal/cast-list/cast-list.page';
import { DirectivesModule } from '../directives/directives.module';
import { MomentjsPipe } from '../helpers/momentjs.pipe';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule,
    DirectivesModule,
    ComponentsModule,
  ],
  declarations: [MovieDetailsPage, CastListPage],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [CastListPage],
})
export class MovieDetailsPageModule {}
