import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ModifyHeaderDirective } from './modify-header.directive';
import { HideHeaderOnscrollDirective } from './hide-header-onscroll.directive';
@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [ModifyHeaderDirective, HideHeaderOnscrollDirective],
  exports: [ModifyHeaderDirective, HideHeaderOnscrollDirective],
})
export class DirectivesModule {}
