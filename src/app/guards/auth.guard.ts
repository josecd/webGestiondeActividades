import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/testeo/auth/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public _auth: AuthServiceService,
    private router: Router,

  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<any>  {

    return new Promise(async (resolve, reject) => {
      const auths = await this.afAuth.authState.subscribe(res => {
        if (res?.uid) {
          return resolve(true);
        }else{
          this.router.navigate(['/entrar']);
          return resolve(false);
        }

      })
    });
  }
}
