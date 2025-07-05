import { Pipe, PipeTransform } from '@angular/core';
import { NavigationItemModel } from '../navigation';

@Pipe({
  name: 'nav'
})
export class NavPipe implements PipeTransform {

  transform(value: NavigationItemModel[],search: string): NavigationItemModel[] {
  return value.filter(item => {
     return item.title.toLowerCase().includes(search.toLowerCase());
  });
  }
}
