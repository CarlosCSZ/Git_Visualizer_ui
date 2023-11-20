import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sidebarOpen: boolean = false;

  constructor(private router: Router) {}


  getColor(route: string) {
    if(this.router.url === route) {
      return 'white'
    }
    return 'black'
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
