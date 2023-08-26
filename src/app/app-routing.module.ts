import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityCardResolver } from './city-card/city-card-resolver.service';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResolveLocationService } from './shared/services/resolve-location.service';
import { WeatherComponent } from './weather/weather.component';

const APP_ROUTER: Routes = [
  { path: '', component: WeatherComponent, resolve: { weather: ResolveLocationService } },
  { path: ':city', component: WeatherComponent, resolve: { weather: CityCardResolver } },
  { path: 'service/search', component: NotFoundComponent },
  {
    path: '**',
    component: ErrorComponent,
    data: { title: '404 Not Found', message: 'You may be lost. Follow the breadcrumbs back <a href="/">home</a>.' } }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTER)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
