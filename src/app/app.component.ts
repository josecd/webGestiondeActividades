import { AngularFireAuth } from '@angular/fire/auth';
import { globals } from './utils/golbals';
import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Router } from '@angular/router';
registerLocaleData(localeEs);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  estado = globals;
  title = 'gestionDeActividades';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) {
    this.loadUser();

  }
  ngOnInit() {
  }
  async loadUser() {

    const auths = await this.auth.authState.subscribe(res => {
      if (res?.uid) {
        const user=  res
        globals.name = user.displayName;
        globals.udi = user.uid;
        globals.urlPerfil= user.photoURL;
        globals.estado = true;
          globals.estado = true;
      } else if (res?.uid === null) {
        console.log(res.uid);
        globals.estado = false;
        this.router.navigate(['entrar']);
      }

    })

    // this.userObs$ = this._user.login(uid)
    // this.userSub = this.userObs$.subscribe(res => {
    //   globals.type = res.type;
    //   globals.name = res.name;
    //   globals.estado = true;
    // })

  }
}
