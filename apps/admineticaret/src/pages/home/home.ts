import { Component, inject, signal } from '@angular/core';
import Blank from '../../components/blank/blank';
import { Common } from '../../services/common';
import { BreadcrumbModel } from '../layouts/breadcrumb';

@Component({
  selector: 'app-home',
  imports: [Blank],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home {
readonly breadcrumbs =signal<BreadcrumbModel[]>([
  { title: 'AnaSayfa', link: '/', icon: 'home' }
]);
//  readonly #common = inject(Common);

//  constructor() {
//    this.#common.set('AnaSayfa', '/', 'home');
// }
}
