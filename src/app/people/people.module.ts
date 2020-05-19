import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeoplePageRoutingModule } from './people-routing.module';

import { PeoplePage } from './people.page';
import { ComponentsModule } from '../components/components.module';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PeoplePageRoutingModule, ComponentsModule],
  declarations: [PeoplePage, ShrinkingSegmentHeaderComponent],
})
export class PeoplePageModule {}
