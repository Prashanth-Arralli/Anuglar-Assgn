import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h3><a [routerLink]="['/']">Footy Buzz</a></h3>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  {}
