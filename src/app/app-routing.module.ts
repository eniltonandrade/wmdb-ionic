import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'movie-details/:id',
    loadChildren: () => import('./movie-details/movie-details.module').then((m) => m.MovieDetailsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'cast-list',
    loadChildren: () => import('./modal/cast-list/cast-list.module').then((m) => m.CastListPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'people/:id',
    loadChildren: () => import('./people/people.module').then((m) => m.PeoplePageModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
