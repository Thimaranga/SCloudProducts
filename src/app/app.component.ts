import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CloudS';

  showNavbar: boolean = false;

  constructor(private router: Router, private dataService: DataService){

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.startsWith('/login');
      }
    });
  }

  logout() {
    const confirmation = confirm("Do you want to logout");
    if(confirmation){
      this.dataService.clearStorage();
      this.router.navigate(['login']);
    }
  }

}
