import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('errorModal') errorModal!: NgbModalRef;

  username: string = "";
  password: string = "";
  isFormValid: boolean = false;

  constructor(private router: Router, private dataService: DataService, private modalService: NgbModal) {
    dataService.clearStorage();
  }

  checkFormValidity() {
    this.isFormValid = this.username.trim().length > 0 && this.password.trim().length > 0;
  }

  onSubmit() {
    const newToken = this.generateToken();
    if (newToken) {
      this.dataService.setTokens(newToken, this.username)
      this.router.navigate(['home']);
    } else {
      this.openErrorModal();
    }
  }

  generateToken() {
    if (this.username === "hello@world.com" && this.password === "1234") {
      return Math.random().toString();
    } else {
      return null;
    }
  }

  openErrorModal() {
    this.modalService.open(this.errorModal);
  }

}
