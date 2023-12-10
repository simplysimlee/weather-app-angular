import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { CURRENT_WEATHER } from '../../models/current_weather';
import { DAILY_FORECAST } from '../../models/daily_forecast';
import { CityDetails } from '../../models/city-model';
import { URL_CONSTANTS } from '../../constants/url-constants';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current weather details', () => {
    const mockCity = 'London';
    const mockUrl = 'mock-url';
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

    service.getWeather(mockCity, mockUrl).subscribe((weather) => {
      expect(weather).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(`${mockUrl}&city=${mockCity}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
  });

  it('should get daily forecast details', () => {
    const mockCity = 'London';
    const mockUrl = 'mock-url';
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

    service.getDailyForecast(mockCity, mockUrl).subscribe((forecast) => {
      expect(forecast).toEqual(mockForecast);
    });

    const req = httpMock.expectOne(`${mockUrl}&city=${mockCity}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockForecast);
  });

  it('should get city details', () => {
    const mockQuery = 'Lon';
    const mockCities: CityDetails[] = [
      {
          "administrativeArea": {
              "englishName": null,
              "id": "LND",
              "localizedName": "London"
          },
          "country": {
              "englishName": null,
              "id": "GB",
              "localizedName": "United Kingdom"
          },
          "key": "328328",
          "localizedName": "London",
          "primaryPostalCode": null
      }];

    service.getCities(mockQuery).subscribe((cities) => {
      expect(cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne(`${URL_CONSTANTS.FETCH_CITIES}?query=${mockQuery}&language=en-gb`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  });
});
