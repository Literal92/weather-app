import { Action } from '@ngrx/store';
import { Weather } from '../interfaces/weather';

export enum WeatherActionTypes {
    LOAD_WEATHER = '[Weather] Load Weather Info',
    LOAD_WEATHER_SUCCESS = '[Weather] Load Weather Info Successfully',
}


export class LoadWeather implements Action {
    readonly type = WeatherActionTypes.LOAD_WEATHER;
}
export class LoadWeatherSuccess implements Action {
    readonly type = WeatherActionTypes.LOAD_WEATHER_SUCCESS;
    constructor(public payload: Weather){}
}

export type WeatherActions = LoadWeather
| LoadWeatherSuccess;