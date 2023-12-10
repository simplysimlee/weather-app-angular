import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CountryDetailsComponent } from './country-details.component';
import { HttpService } from '../../service/http/http.service';
import { CityDetails } from 'src/app/models/city-model';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let httpServiceMock: jasmine.SpyObj<HttpService>;
  const cities: CityDetails[] = [
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
  },
  {
    "administrativeArea": {
        "englishName": null,
        "id": "LND",
        "localizedName": "London0"
    },
    "country": {
        "englishName": null,
        "id": "GB",
        "localizedName": "United Kingdom0"
    },
    "key": "328328",
    "localizedName": "London",
    "primaryPostalCode": null
}, {
  "administrativeArea": {
      "englishName": null,
      "id": "LND",
      "localizedName": "London1"
  },
  "country": {
      "englishName": null,
      "id": "GB",
      "localizedName": "United Kingdom1"
  },
  "key": "328328",
  "localizedName": "London",
  "primaryPostalCode": null
}
  ];

  beforeEach(() => {
   
    const httpSpy = jasmine.createSpyObj('HttpService', [
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
      }]);


    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,CountryDetailsComponent],
      providers: [{ provide: HttpService, useValue: httpSpy }],
    });

    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    httpServiceMock = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should call getCities when searchInput value changes', fakeAsync(() => {
  

    httpServiceMock.getCities.and.returnValue(of(cities));

    component.autocompleteForm.get('searchInput')?.setValue('SomeCity');
    tick(300); // debounce time

    expect(httpServiceMock.getCities).toHaveBeenCalledWith('SomeCity');
    expect(component.filteredCities).toEqual(cities);
  }));

  xit('should reset selectedCityIndex when getCities response is received', fakeAsync(() => {
  
    httpServiceMock.getCities.and.returnValue(of(cities));

    component.selectedCityIndex = 2; // some non-zero index
    component.autocompleteForm.get('searchInput')?.setValue('SomeCity');
    tick(300);

    expect(component.selectedCityIndex).toEqual(-1);
  }));

  xit('should not call getCities when searchInput value is empty', fakeAsync(() => {
   
    httpServiceMock.getCities.and.returnValue(of(cities));

    component.autocompleteForm.get('searchInput')?.setValue('');
    tick(300);

    expect(httpServiceMock.getCities).not.toHaveBeenCalled();
  }));

  it('should not emit city name when selectCity is called with an invalid city', () => {
    const city: CityDetails = {} as CityDetails;

    spyOn(component.selectedCity, 'emit');
    component.selectCity(city);

    expect(component.selectedCity.emit).not.toHaveBeenCalled();
  });

  xit('should handle onKeyDown events correctly', () => {
   
    component.filteredCities = cities;
    component.selectedCityIndex = 1;

    // Simulate ArrowUp key press
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(component.selectedCityIndex).toEqual(0);

    // Simulate ArrowDown key press
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(component.selectedCityIndex).toEqual(1);

    // Simulate Enter key press
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.selectCity).toHaveBeenCalledWith(cities[1]);
  });
});
