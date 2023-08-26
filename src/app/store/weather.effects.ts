import { Weather } from '../interfaces/weather';
import { WeatherService } from '../services/weather.service';
import * as WeatherActions from './weather.actions'
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class WeatherEffects {

    constructor(
        private weatherService: WeatherService,
        private actions$: Actions
    ) { }

    LoadWeather$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WeatherActions.WeatherActionTypes.LOAD_WEATHER),
            mergeMap(() => this.weatherService.getWeather().pipe(
                map((weather: Weather) => new WeatherActions.LoadWeatherSuccess(weather))
            ))
        );
    });
}