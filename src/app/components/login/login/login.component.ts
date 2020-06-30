import { Component, OnInit } from '@angular/core';
import { RecuperarContrasenaComponent } from '../../../modals/recuperar-contrasena/recuperar-contrasena.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  resetpass() {
    this.dialog.open(RecuperarContrasenaComponent, {
      maxWidth: '600px',
      disableClose: false,

    });
  }
}
