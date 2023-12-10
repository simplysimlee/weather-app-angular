import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDetailsComponent } from './weather-details.component';
import { HttpService } from '../../service/http/http.service';
import { of } from 'rxjs';
import { URL_CONSTANTS } from '../../constants/url-constants';
import { CURRENT_WEATHER } from 'src/app/models/current_weather';
import { DAILY_FORECAST } from 'src/app/models/daily_forecast';
import { DateSortPipe } from 'src/app/pipe/date-sort/date-sort.pipe';
import { FormsModule } from '@angular/forms';

describe('WeatherDetailsComponent', () => {
  let component: WeatherDetailsComponent;
  let fixture: ComponentFixture<WeatherDetailsComponent>;
  let httpServiceMock: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getWeather', 'getDailyForecast']);

    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [{ provide: HttpService, useValue: httpSpy }],
      imports: [FormsModule, WeatherDetailsComponent,DateSortPipe],
    });

    fixture = TestBed.createComponent(WeatherDetailsComponent);
    component = fixture.componentInstance;
    httpServiceMock = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeather and getDailyForecast when searchWeatherDetails is called with a valid city name', () => {
    const cityName =  'London';
  
    const mockWeather: CURRENT_WEATHER = {
      "count": 1,
      "data": [
          {
              "app_temp": 11.7,
              "aqi": 33,
              "city_name": "City of London",
              "clouds": 87,
              "country_code": "GB",
              "datetime": "2023-12-10:16",
              "dewpt": 9.9,
              "dhi": 0,
              "dni": 0,
              "elev_angle": -1.9,
              "ghi": 0,
              "gust": 10.8,
              "h_angle": -90,
              "lat": 51.51279,
              "lon": -0.09184,
              "ob_time": "2023-12-10 15:55",
              "pod": "n",
              "precip": 0,
              "pres": 995.5,
              "rh": 89,
              "slp": 997,
              "snow": 0,
              "sources": [
                  "analysis",
                  "AV975",
                  "radar",
                  "satellite"
              ],
              "stateCode": "ENG",
              "solarRAD": 0,
              "station": "AV975",
              "sunrise": "07:55",
              "sunset": "15:51",
              "temp": 11.7,
              "timezone": "Europe/London",
              "ts": 1702223745,
              "uv": 0,
              "vis": 16,
              "weather": {
                  "description": "Broken clouds",
                  "code": 803,
                  "icon": "c03n"
              },
              "wind_cdir": "SW",
              "wind_cdir_full": "southwest",
              "wind_dir": 225,
              "wind_spd": 6.17
          }
      ]
  };
    const mockForecast: DAILY_FORECAST = {
      "city_name": "London",
      "country_code": "GB",
      "data": [
          {
              "app_max_temp": 12.4,
              "app_min_temp": 8.9,
              "clouds": 58,
              "clouds_hi": 34,
              "clouds_low": 62,
              "clouds_mid": 45,
              "datetime": new Date("2023-12-10"),
              "dewpt": 7.1,
              "high_temp": 12.5,
              "low_temp": 8.2,
              "max_dhi": null,
              "max_temp": 12.4,
              "min_temp": 8.9,
              "moon_phase": 0.0238619,
              "moon_phase_lunation": 0.93,
              "moonrise_ts": 1702184483,
              "moonset_ts": 1702218109,
              "ozone": 328,
              "pop": 45,
              "precip": 1.5327148,
              "pres": 999.4,
              "rh": 84,
              "slp": 1001,
              "snow": 0,
              "snow_depth": 0,
              "sunrise_ts": 1702194815,
              "sunset_ts": 1702223482,
              "temp": 9.7,
              "ts": 1702166460,
              "uv": 0,
              "valid_date": new Date("2023-12-10"),
              "vis": 24.128,
              "weather": {
                  "icon": "r04d",
                  "description": "Light shower rain",
                  "code": 520
              },
              "wind_cdir": "SW",
              "wind_cdir_full": "southwest",
              "wind_dir": 225,
              "wind_gust_spd": 10.7,
              "wind_spd": 5.2
          }
      ],
      "lat": "51.51279",
      "lon": "-0.09184",
      "state_code": "ENG",
      "timezone": "Europe/London"
  };

    httpServiceMock.getWeather.and.returnValue(of(mockWeather));
    httpServiceMock.getDailyForecast.and.returnValue(of(mockForecast));

    component.searchWeatherDetails(cityName);

    expect(httpServiceMock.getWeather).toHaveBeenCalledWith(cityName, URL_CONSTANTS.CURRENT_WEATHER);
    expect(httpServiceMock.getDailyForecast).toHaveBeenCalledWith(cityName, URL_CONSTANTS.DAILY_FORECAST);
    //expect(component.currentWeather).toBeObservable(of(mockWeather));
    //expect(component.getDailyForecast).toBeObservable(of(mockForecast));
  });

  it('should not call getWeather and getDailyForecast when searchWeatherDetails is called with an empty city name', () => {
    const cityName = '';

    component.searchWeatherDetails(cityName);

    expect(httpServiceMock.getWeather).not.toHaveBeenCalled();
    expect(httpServiceMock.getDailyForecast).not.toHaveBeenCalled();
  });

  it('should toggle sortValue when toggleSort is called', () => {
    expect(component.sortValue).toEqual('asc');

    component.toggleSort();
    expect(component.sortValue).toEqual('desc');

    component.toggleSort();
    expect(component.sortValue).toEqual('asc');
  });
});
