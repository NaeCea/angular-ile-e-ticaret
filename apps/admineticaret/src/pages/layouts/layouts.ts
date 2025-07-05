import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigations } from '../../navigation';
import { NavPipe } from '../../pipes/nav-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layouts',
  imports: [
    Breadcrumb,
    RouterLink,
    RouterLinkActive,
    NavPipe,
    FormsModule
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layouts {
  readonly search = signal<string>('');
  readonly timing =signal<string>('');
  readonly navigation= computed(() => navigations);
  readonly dating =signal<string>(new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }));
  readonly yearing = signal<string>(new Date().getFullYear().toString());

  constructor() {
    this.timing.set(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit',second: '2-digit' }));
    setInterval(() => {
      this.timing.set(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit',second: '2-digit' }));
    }, 1000);
    setInterval(() => {
      this.dating.set(new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }));
    }, 1000);


  }

}
