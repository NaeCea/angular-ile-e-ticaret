import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../../components/blank/blank';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initialProuduct, ProductModel } from '../products';

@Component({
  selector: 'app-product-create',
  imports: [
    Blank,FormsModule,NgxMaskDirective
  ],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export default class ProductCreate {



 readonly id=signal<string|undefined>(undefined); // Ürün ID'si için signal

 readonly  cardTitle =computed(() => {
  return this.id() ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'; // Eğer ID varsa "Ürünü Düzenle", yoksa "Yeni Ürün Ekle"
 });

 readonly btnName= computed(()=>
{
  return this.id()?"Güncelle":"Ürün Ekle";
}
)
  readonly #http=inject(HttpClient);

readonly result = resource({
  params: () => this.id(),
  loader: async () => {
    try {
      const res = await lastValueFrom(
        this.#http.get<ProductModel>(`http://localhost:3000/products/${this.id()}`)
      );
      return res;
    } catch (err: any) {
      // Eğer HttpErrorResponse ise Error objesi hâline getir
      const message =
        err?.error?.message || err?.message || 'Ürün bilgisi alınırken hata oluştu.';
      throw new Error(message);
    }
  }
});


  readonly data = linkedSignal(()=>this.result.value()??initialProuduct)
//readonly #router = inject(Router);  
readonly #location = inject(Location);  
readonly #toast = inject(FlexiToastService); // Flexi Toast servisi
readonly #active= inject(ActivatedRoute)

constructor() {
  // Eğer URL'de bir ID varsa, onu al ve id signal'ine ata
  this.#active.params.subscribe(params => {
    if (params['id']) {
      this.id.set(params['id']);
    }
  });

}

saveProduct(form: NgForm) {
if(!form.valid) {
  console.log(form.value);
  return;
}

if(this.id())
{
this.#http.put(`http://localhost:3000/products/${this.id()}`, this.data())
  .subscribe({
    next: (response) => {
      console.log('Ürün başarıyla güncellendi:', response);
      form.reset(); // Formu sıfırla
      //this.#router.navigate(['/products']); // Ürünler sayfasına yönlendir
      this.#location.back(); // Geri git
      this.#toast.showToast("Başarılı",'Ürün başarıyla güncellendi!',"info"); // Başarılı mesajı göster
    },
    error: (error) => {
      console.error('Ürün eklenirken hata oluştu:', error);
    } 
  
  }
  );
}
else
{


  this.#http.post("http://localhost:3000/products", form.value)
  .subscribe({
    next: (response) => {
      console.log('Ürün başarıyla eklendi:', response);
      form.reset(); // Formu sıfırla
      //this.#router.navigate(['/products']); // Ürünler sayfasına yönlendir
      this.#location.back(); // Geri git
      this.#toast.showToast("Başarılı",'Ürün başarıyla eklendi!',"success"); // Başarılı mesajı göster
    },
    error: (error) => {
      console.error('Ürün eklenirken hata oluştu:', error);
    } 
  
  }
  );
}


}
}