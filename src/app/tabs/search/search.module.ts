import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { MoviesListsGhostComponent } from 'src/app/components/movies-lists-ghost/movies-lists-ghost.component';

import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { HighlightPipe } from 'src/app/helpers/highlight.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SearchPageRoutingModule, ComponentsModule, DirectivesModule],
  declarations: [SearchPage, MoviesListsGhostComponent, HighlightPipe],
})
export class SearchPageModule {}
