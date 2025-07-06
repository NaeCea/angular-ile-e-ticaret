import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../services/common';

export interface BreadcrumbModel {
  title: string;
  link: string;
  icon: string;
}

@Component({
  
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  template:`
  <ol class="breadcrumb">
@for (val of data(); track val.link) {

    <li class="breadcrumb-item">
      <a [routerLink]="val.link" class="d-flex align-items-center">
            <span class="material-symbols-outlined">{{val.icon}}</span>
            <span>{{val.title}}</span>
      </a>
    </li>
}

</ol>

  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export default  class Breadcrumb {

  readonly data = computed(() => this.#common.data());

// TODO: Import or define 'common' if needed, or remove the following line if not used
// import { common } from 'path-to-common'; // Uncomment and set the correct path if 'common' should be imported

readonly #common = inject(Common); // Uncomment if 'common' is imported and needed

}
