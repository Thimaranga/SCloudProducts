import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('accessToken', accessToken);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setUserId(userId: string) {
    return localStorage.setItem('userId', userId);
  }

  setTokens(accessToken: string, userId:string){
    this.setAccessToken(accessToken);
    this.setUserId(userId);
  }

  clearStorage() {
    localStorage.clear();
  }

  isAuthenticate(){
    return this.getUserId() && this.getAccessToken();
  }
}
