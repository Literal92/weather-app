import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { WeatherService } from './weather.service';


@Injectable()
export class ResolveLocationService  {
  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) { };

  resolve(): Observable<any> { // TODO: I think, It shouldn't be so
    this.weatherService.getWeatherByСurrentLocation()
      .then((city) => {
        this.router.navigate([`/${city}`]);
      })
      .catch(error => console.error(error));

    return empty();
  }
}
