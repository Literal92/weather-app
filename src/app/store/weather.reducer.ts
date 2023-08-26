import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherActions, WeatherActionTypes } from './weather.actions';

interface WeatherState { Weather: any }

const initialState: WeatherState = {
    Weather: null,
}

export const GetWeatherFeatureState = createFeatureSelector<WeatherState>('Weather');
export const GetWeatherInfo = createSelector(
    GetWeatherFeatureState,
    state => state.Weather
);

export function WeatherReducer(state = initialState, action: WeatherActions): WeatherState {
    switch (action.type) {
        case WeatherActionTypes.LOAD_WEATHER_SUCCESS:
            return {
                ...state,
                Weather: action.payload
            };

        default:
            return state;
    }
}