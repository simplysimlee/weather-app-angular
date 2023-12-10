import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpService } from '../../service/http/http.service';

import { CityDetails } from 'src/app/models/city-model';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent {
  @Output() selectedCity = new EventEmitter<string>();

  autocompleteForm: FormGroup = new FormGroup({});
  filteredCities: CityDetails[] = [];
  selectedCityIndex: number = -1;

  constructor(private fb: FormBuilder, private cityService: HttpService) {}

  ngOnInit(): void {
    // Initialize the form
    this.autocompleteForm = this.fb.group({
      searchInput: ['']
    });

    // Subscribe to value changes on the search field
    this.autocompleteForm.get('searchInput')?.valueChanges.pipe(
      debounceTime(300), //  debounce time 
      distinctUntilChanged(),
      switchMap(value =>  this.cityService.getCities(value) )
    ).subscribe(data => {
      // reset the selected index when the list changes
      this.selectedCityIndex = -1; 
      this.filteredCities = data;
    },()=>{
      this.filteredCities = [];
    });
  }

  selectCity(city: CityDetails): void {
    if(city && city.localizedName){
        // Disable valueChanges while setting the value
     this.autocompleteForm.get('searchInput')?.setValue(city.localizedName, { emitEvent: false });
     this.filteredCities = [];
     this.selectedCityIndex = -1;
     this.emitCityName();
    }
   
  }
  //Keyboard events
  onKeyDown(event: KeyboardEvent): void {
    console.log(this.selectedCityIndex);
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedCityIndex = Math.max(0, this.selectedCityIndex - 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedCityIndex = Math.min(this.filteredCities.length - 1, this.selectedCityIndex + 1);
    } else if (event.key === 'Enter') {
       if(this.selectedCityIndex !== -1) event.preventDefault();
      this.selectCity(this.filteredCities[this.selectedCityIndex]);
     
    }
  }

  //emit city name
  emitCityName(): void {
    this.selectedCity.emit(this.autocompleteForm.get('searchInput')?.value);
  }
}
