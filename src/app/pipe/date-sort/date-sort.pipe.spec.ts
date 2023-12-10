import { TestBed } from '@angular/core/testing';
import { DateSortPipe } from './date-sort.pipe';
import { Datum } from 'src/app/models/daily_forecast';


describe('DateSortPipe', () => {
  let pipe: DateSortPipe;
  const data: Datum[] = [
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
    },
    {
      "app_max_temp": 12.4,
      "app_min_temp": 8.9,
      "clouds": 58,
      "clouds_hi": 34,
      "clouds_low": 62,
      "clouds_mid": 45,
      "datetime": new Date("2023-12-11"),
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
  },
  {
    "app_max_temp": 12.4,
    "app_min_temp": 8.9,
    "clouds": 58,
    "clouds_hi": 34,
    "clouds_low": 62,
    "clouds_mid": 45,
    "datetime": new Date("2023-12-12"),
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
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DateSortPipe],
      providers: [DateSortPipe],
    });

    pipe = TestBed.inject(DateSortPipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort dates in ascending order', () => {
   
    const sortedData = pipe.transform(data, 'asc');

    expect(sortedData[0].datetime).toEqual(new Date('2023-12-10'));
    expect(sortedData[1].datetime).toEqual(new Date('2023-12-11'));
    expect(sortedData[2].datetime).toEqual(new Date('2023-12-12'));
  });

  it('should sort dates in descending order', () => {
   

    const sortedData = pipe.transform(data, 'desc');

    expect(sortedData[0].datetime).toEqual(new Date('2023-12-12'));
    expect(sortedData[1].datetime).toEqual(new Date('2023-12-11'));
    expect(sortedData[2].datetime).toEqual(new Date('2023-12-10'));
  });

  it('should return data when sort type is not provided', () => {
   

    const sortedData = pipe.transform(data);

    expect(sortedData[0].datetime).toEqual(new Date('2023-12-10'));
    expect(sortedData[1].datetime).toEqual(new Date('2023-12-11'));
    expect(sortedData[2].datetime).toEqual(new Date('2023-12-12'));
  });
});
