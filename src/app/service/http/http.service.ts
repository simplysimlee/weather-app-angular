import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { CityDetails } from '../../models/city-model';
import { URL_CONSTANTS } from '../../constants/url-constants';
import { CURRENT_WEATHER } from '../../models/current_weather';
import { DAILY_FORECAST } from '../../models/daily_forecast';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly $http: HttpClient) {}

  /**
   * getWeather is used to get the current weather details
   * @param city 
   * @param url 
   * @returns 
   */
  getWeather(
    city: string,
    url: string
  ): Observable<CURRENT_WEATHER> {
    return this.$http
      .get<CURRENT_WEATHER >(`${url}&city=${city}`)
      .pipe(shareReplay(1));
  }

  getDailyForecast(
    city: string,
    url: string
  ): Observable<DAILY_FORECAST> {
    return this.$http
      .get<DAILY_FORECAST>(`${url}&city=${city}`)
      .pipe(shareReplay(1));
  }

  getCities(query: string): Observable<CityDetails[]> {
    const url = `${URL_CONSTANTS.FETCH_CITIES}?query=${query}&language=en-gb`;
    return this.$http.get<CityDetails[]>(url)
  }
}
