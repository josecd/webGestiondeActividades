import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.component.html',
  styleUrls: ['./perfil-amigo.component.scss']
})
export class PerfilAmigoComponent implements OnInit {

  formControl: FormGroup

  dataUser

  private unSubscribe$ = new Subject<void>();

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PerfilAmigoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,

   
  ) { 
    console.log(data);
    this.dataUser = data
  }

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

  verPerfil(){
    // this.close()
    this.router.navigate(['/tareas',this.dataUser.idAmigo]);
    this.close();
  }

  verHorario(){
    this.router.navigate(['/materias',this.dataUser.idAmigo]);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
