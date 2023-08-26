import { HttpClient } from '@angular/common/http';

import { AppService } from './app.service';
import { LoaderService } from './loader.service';
import { HelperService } from './helper.service';
import { WeatherIconsService } from '../shared/weather-icons.service';

import { Weather } from '../interfaces/weather';
import { apiConfig, appConfig } from '../config';
import * as wiDataByCode from '../shared/weather-icons-codes.data.json';
import { interval, map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class WeatherService {
  private unitSystem: string;
  private weather: Subject<Weather> = new Subject<Weather>();
  private currentWeatherTimestamp!: number;
  private subscribers: any = {};
  private wiDataByCode: any;
  private weatherUpdateInterval = apiConfig.updateInterval.weather;

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private loaderService: LoaderService,
    private helperService: HelperService,
    private weatherIconsService: WeatherIconsService,
  ) {
    this.unitSystem = appService.getUnitSystem();
    this.wiDataByCode = wiDataByCode;
  }

  getWeather(): Subject<Weather> {
    return this.weather;
  }

  getCurrentWeatherTimestamp(): number {
    return this.currentWeatherTimestamp;
  }

  getWeatherByLocation() {
    const latitude = appConfig.defaultCity.coord.latitude;
    const longitude = appConfig.defaultCity.coord.longitude;
    return interval(this.weatherUpdateInterval).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get(
          `${apiConfig.host}/weather?appid=${apiConfig.appId}&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`
        ).pipe(
          map((data: any) => {
            this.loaderService.hide();
            const weather = this.handleResponseWeatherData(data);

            this.weather.next(weather);
            return weather;
          })
        )
      )
    );
  }

  getWeatherByCity(city: string): Observable<any> {
    this.loaderService.show();
    if (city) {
      return interval(this.weatherUpdateInterval).pipe(
        startWith(0),
        switchMap(() =>
          this.http.get(
            `${apiConfig.host}/weather?appid=${apiConfig.appId}&q=${city}&units=${this.unitSystem}`
          ).pipe(
            map((data) => {
              this.loaderService.hide();
              const weather = this.handleResponseWeatherData(data);

              this.weather.next(weather);
              return weather;
            })
          )
        )
      );
    } else {
      return this.getWeatherByLocation();
    }
  }

  private handleResponseWeatherData(responseData: any): Weather {
    const { name, main, weather, wind, sys, dt } = responseData;

    this.currentWeatherTimestamp = dt;

    const updateAt = new Date().getTime();
    const iconClassname = this.weatherIconsService.getIconClassNameByCode(weather[0].id, sys.sunset);
    const temperature = Math.round(main.temp);
    const pressureInHpa = Math.round(main.pressure);
    const pressure = (this.unitSystem === appConfig.defaultUnit) ?
      this.helperService.getPressureInMmHg(pressureInHpa) :
      pressureInHpa;
    const windDegrees = Math.round(wind.deg);
    const windDirection = this.helperService.getWindDirection(windDegrees);
    const windBeaufortScale = this.helperService.getWindBeaufortScaleByMeterInSecond(wind.speed);
    const sunriseTime = sys.sunrise * 1000;
    const sunsetTime = sys.sunset * 1000;

    return new Weather(
      updateAt,
      name,
      iconClassname,
      temperature,
      main.humidity,
      pressure,
      weather[0].description,
      sunriseTime,
      sunsetTime,
      windDirection,
      wind.speed,
      windBeaufortScale
    );
  }
}
