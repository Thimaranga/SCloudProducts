import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

export const authGuard: CanActivateFn = (route, state) => {

  const dataService = inject(DataService);
  const router = inject(Router);

  const token = dataService.getAccessToken();

  if(token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
