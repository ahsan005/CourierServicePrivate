import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'City',
    pure: false
})
export class CityPipe implements PipeTransform {
    transform(filter:number ): any {
      // 0: {Value: '1', Text: 'Lahore'}
      // 1: {Value: '2', Text: 'Rawalpindi'}
      // 2: {Value: '3', Text: 'Karachi'}
      // 3: {Value: '4', Text: 'Islamabad'}
      // 4: {Value: '5', Text: 'Kasur'}
      // 5: {Value: '6', Text: 'Mu
      switch(filter) {
        case 1: {
         return "Lahore"
           break;
        }
        case 2: {
         return "Rawalpindi"
           break;
        }
        case 3: {
         return "Karachi"
           break;
        }
        case 4: {
         return "Islamabad"
           break;
        }
        case 5: {
         return "Kasur"
           break;
        }
        case 6: {
         return "Multan"
           break;
        }
        default: {
          "Error Identifying CityID"
          break;
       }

      }
    }
}
