import { Pipe, PipeTransform } from '@angular/core';
import { Datum } from '../../models/daily_forecast';
type sortType = "asc" | "desc";

@Pipe({
  name: 'dateSort',
  standalone: true
})
export class DateSortPipe implements PipeTransform {
  /**
   * This pipe is used to sort the date in ascending or descending order
   * @param value 
   * @param args 
   * @returns 
   */
  transform(value: Datum[], args?: sortType): Datum[] {
    if(args === 'desc') {
     return value.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    }else{
     return value.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    }
  }

}
