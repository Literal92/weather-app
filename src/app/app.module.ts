import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './services/weather.service';
import { ErrorComponent } from './components/error/error.component';
import { CityCardResolver } from './services/city-card-resolver.service';
import { FormsModule } from '@angular/forms';
import { CityCardComponent } from './components/city-card/city-card.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AppService } from './services/app.service';
import { LocalStorageService } from './services/localstorage.service';
import { ResolveLocationService } from './services/resolve-location.service';
import { LoaderService } from './services/loader.service';
import { HelperService } from './services/helper.service';
import { WeatherIconsService } from './shared/weather-icons.service';
import { HttpErrorInterceptor } from './services/interceptors/error-Interceptor.service';
import { Router } from '@angular/router';
import * as Sentry from "@sentry/angular-ivy";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherReducer } from './store/weather.reducer';
import { WeatherEffects } from './store/weather.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    WeatherComponent,
    NotFoundComponent,
    SearchBarComponent,
    ErrorComponent,
    CityCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    UiSwitchModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature('weater-app', WeatherReducer),
    EffectsModule.forRoot(WeatherEffects)
  ],
  providers: [
    AppService,
    LocalStorageService,
    CityCardResolver,
    ResolveLocationService,
    WeatherService,
    LoaderService,
    HelperService,
    WeatherIconsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    }, {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
