import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router, private dataService: DataService){

  }

  logout() {
    const confirmation = confirm("Do you want to logout");
    if(confirmation){
      this.dataService.clearStorage();
      this.router.navigate(['login']);
    }
  }

}
