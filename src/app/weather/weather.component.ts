import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../services/app.service';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../interfaces/weather';
import { Subscription } from 'rxjs';
import { select, State, Store } from '@ngrx/store';
import * as WeatherActions from '../store/weather.actions';
import * as weatherReducer from '../store/weather.reducer';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  private _weatherSubscription: Subscription;
  weather: Weather;
  unitSystem: string;
  city: string;

  constructor(
    private appService: AppService,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.unitSystem = appService.getUnitSystem();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (data: { city: string }) => {
        this.store.dispatch(new WeatherActions.LoadWeather(data.city));
      }
    );

    this.store.pipe(select(weatherReducer.GetWeatherInfo)).subscribe((data) => {
      this.weather = data;
    });
  }

}
