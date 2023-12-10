import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [WeatherDetailsComponent, HttpClientModule, BrowserModule],
      providers: [],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'my-weather-app'`, () => {
    expect(component.title).toEqual('my-weather-app');
  });

 
});
