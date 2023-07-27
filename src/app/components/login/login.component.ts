import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private router: Router, private dataService: DataService){

  }

  onSubmit() {
    const newToken = Math.random().toString();
    this.dataService.setTokens(newToken, this.username)
    this.router.navigate(['dashboard']);
  }

}
