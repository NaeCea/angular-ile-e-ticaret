import { Component, computed, inject, signal } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';

export interface ProductModel  {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  categoryId: string; // Optional field for category
  categoryName?: string; // Optional field for category name
}
export const initialProuduct: ProductModel = {
  id: 0,
  name: "",
  price: 0,
  stock: 0,
  description: "",
  imageUrl: "",
  categoryId: "2", // Optional field for category
  categoryName: "Telefon" // Optional field for category name
};
@Component({
  selector: 'app-products',
  imports: [Blank,FlexiGridModule,CommonModule, RouterLink],
  templateUrl: './products.html'
 
})
export default class  Products {

  readonly result = httpResource<ProductModel[]>(()=> "http://localhost:3000/products" )

  readonly dataflexi =computed(() => this.result.value()??[]);

  readonly loading = computed(() => this.result.isLoading());

  readonly #toast = inject(FlexiToastService);
  readonly #http =inject(HttpClient);


 
deleteProduct(id:string) {


  this.#toast.showSwal("Sil", "Bu ürünü silmek istediğinize emin misiniz?", "Sil", ()=> {
    this.#http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {

   this.result.reload();
    });
   this.#toast.showToast("Başarılı", "Ürün başarıyla silindi!", "success");});
}
editProduct(arg0: any) {
throw new Error('Method not implemented.');
}
breadcrumbs(): import("../layouts/breadcrumb").BreadcrumbModel[] {
  return [
    
    { title: 'Ürünler', link: '/products', icon: 'box' }
  ];
}
// readonly dataflexi = signal<ProductModel[]>([
//   { id: 1, name: 'Iphone 13 Pro', price: 100, stock: 10, description: 'Iphone 13 pro siyah kapak', imageUrl:'https://st-troy.mncdn.com/mnresize/775/775/Content/media/ProductImg/original/mlpf3tua-apple-iphone-13-128gb-gece-yarisi-638835129370770250.jpg', categoryId: '1', categoryName: 'Telefon' },
//   { id: 2, name: 'Ürün 2', price: 200, stock: 5, description: 'Ürün 2 Açıklaması', imageUrl: 'https://via.placeholder.com/150' , categoryId: '2', categoryName: 'Elektronik' },
//   { id: 3, name: 'Ürün 3', price: 300, stock: 0, description: 'Ürün 3 Açıklaması', imageUrl: 'https://via.placeholder.com/150', categoryId: '3', categoryName: 'Giyim' },
// ]);

readonly catetoryfilter= signal<FlexiGridFilterDataModel[]>([
  
   
      { value: 'Telefon', name: 'Telefon' },
      { value: 'Elektronik', name: 'Elektronik' },
      { value: 'Giyim', name: 'Giyim' }
    
]); // Filter for category

}
