import { Injectable, signal } from '@angular/core';
import { BreadcrumbModel } from '../pages/layouts/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly data = signal<BreadcrumbModel[]>([]);
  

  set(data: BreadcrumbModel[]) {
    const mainPage: BreadcrumbModel = { title: 'AnaSayfa', link: '/', icon: 'home' };
    // const newData = [...data];
    // if (newData.length === 0) {
    //   newData.push(mainPage);
    // } else if (newData[0].title !== mainPage.title || newData[0].link !== mainPage.link) {
    //   newData.unshift(mainPage);
    // }
    // Eğer ilk eleman mainPage değilse, sadece this.data.set ile ekle
    this.data.set(
      data.length === 0 || data[0].title !== mainPage.title || data[0].link !== mainPage.link
        ? [mainPage, ...data]
        : data
    );
    
  }

//  set(title: string, link: string, icon: string) {
//   this.data.splice(0) ;
//    this.data.push({ title, link, icon });
//  }
//   get() {
//     return this.data;
//   }
 
}
