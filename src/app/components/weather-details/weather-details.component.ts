import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../service/http/http.service';
import { Observable, catchError, ignoreElements, of, shareReplay } from 'rxjs';
import { URL_CONSTANTS } from '../../constants/url-constants';
import { CountryDetailsComponent } from '../country-details/country-details.component';
import { CURRENT_WEATHER } from 'src/app/models/current_weather';
import { DAILY_FORECAST } from 'src/app/models/daily_forecast';
import { DateSortPipe } from 'src/app/pipe/date-sort/date-sort.pipe';

type sortType = "asc" | "desc";

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule, CountryDetailsComponent, DateSortPipe],
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent {
  public currentWeather = new Observable<CURRENT_WEATHER>();
  public imageUrl = URL_CONSTANTS.WEATHER_ICONS;
  public getDailyForecast = new Observable<DAILY_FORECAST>();

  public sortValue : sortType = 'asc';

  constructor(private readonly httpService: HttpService) {}

  searchWeatherDetails(cityName: string): void {
    if (cityName) {
      //get current weather details
      this.currentWeather = this.httpService
        .getWeather(cityName, URL_CONSTANTS.CURRENT_WEATHER);
      //get daily forecast details
      this.getDailyForecast = this.httpService
        .getDailyForecast(cityName, URL_CONSTANTS.DAILY_FORECAST);
    }
  }
  toggleSort(): void {
    this.sortValue = this.sortValue === 'asc' ? 'desc' : 'asc';
  }
}
