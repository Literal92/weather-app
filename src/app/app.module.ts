import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather/weather.service';
import { ErrorComponent } from './error/error.component';
import { CityCardResolver } from './city-card/city-card-resolver.service';
import { FormsModule } from '@angular/forms';
import { CityCardComponent } from './city-card/city-card.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AppService } from './shared/services/app.service';
import { LocalStorageService } from './shared/services/localstorage.service';
import { ResolveLocationService } from './shared/services/resolve-location.service';
import { LoaderService } from './loader/loader.service';
import { HelperService } from './shared/services/helper.service';
import { WeatherIconsService } from './shared/services/weather-icons/weather-icons.service';

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
    UiSwitchModule
  ],
  providers: [
    AppService,
    LocalStorageService,
    CityCardResolver,
    ResolveLocationService,
    WeatherService,
    LoaderService,
    HelperService,
    WeatherIconsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
