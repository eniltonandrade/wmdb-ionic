import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./search/search.module').then((m) => m.SearchPageModule),
          },
        ],
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./stats/stats.module').then((m) => m.StatsPageModule),
          },
        ],
      },
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./main/main.module').then((m) => m.MainPageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
