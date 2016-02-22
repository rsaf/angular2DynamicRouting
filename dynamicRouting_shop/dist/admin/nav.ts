import {Component, Input} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'

@Component({
  selector: 'app-nav',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a *ngFor="#route of routes"
        [routerLink]="route.path">

      </a>
    </nav>
  `
})
export class AppNav {
  @Input()
  routes: string[];
}
