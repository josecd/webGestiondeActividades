import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.component.html',
  styleUrls: ['./perfil-amigo.component.scss']
})
export class PerfilAmigoComponent implements OnInit {

  formControl: FormGroup


  private unSubscribe$ = new Subject<void>();

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PerfilAmigoComponent>,

  ) { }

  ngOnInit(): void {
    this.LoginForm()
    // this.getUser();
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  LoginForm() {
    this.formControl = this.formBuilder.group(
      {
        buscarAmigo: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ])
        )
      },
    );
  }

  close() {
    this.dialogRef.close();
  }

}
