import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="main">
    <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gh-graph-UI';
}
