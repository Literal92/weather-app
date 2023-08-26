import { Weather } from '../interfaces/weather';
import { WeatherService } from '../services/weather.service';
import * as WeatherActions from './weather.actions'
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class WeatherEffects {

    constructor(
        private weatherService: WeatherService,
        private actions$: Actions
    ) { }

    LoadWeather$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WeatherActions.WeatherActionTypes.LOAD_WEATHER),
            mergeMap((Actions: WeatherActions.LoadWeather) => this.weatherService.getWeatherByCity(Actions.city).pipe(
                map((weather: Weather) => new WeatherActions.LoadWeatherSuccess(weather)),
                map((action: Action) => action)
            ))
        );
    });
}