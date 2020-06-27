import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MateriasService } from '../../../../services/materias/materias.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarmateria',
  templateUrl: './agregarmateria.component.html',
  styleUrls: ['./agregarmateria.component.scss']
})
export class AgregarmateriaComponent implements OnInit {
  materiaForm: FormGroup;
  dataMateria
  constructor(
    private _materias: MateriasService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarmateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) {
   this.dataMateria = data;
    
   }

  ngOnInit(): void {``
    this.loadForm();
  }


   //Create
   loadForm(){
     if(this.dataMateria){
      this.materiaForm =this.formBuilder.group(
        {
          nombreMateria: new FormControl(
            this.dataMateria.nombreMateria,
            Validators.compose([
              Validators.required
            ])
          ),
          nombreMaestro: new FormControl(
            this.dataMateria.nombreMaestro,
            Validators.compose([
              Validators.required
            ])
          )
        }
      )
     }else{
      this.materiaForm =this.formBuilder.group(
        {
          nombreMateria: new FormControl(
            '',
            Validators.compose([
              Validators.required
            ])
          ),
          nombreMaestro: new FormControl(
            '',
            Validators.compose([
              Validators.required
            ])
          )
        }
      )
     }
  
  }

  addMateria(){
    this._materias.addMateria(this.materiaForm.value)
    .then(res=>{
      this.close()
      console.log('Materia agregada');
    })
    .catch(error=>{
      console.warn(error);
      
    })
  }

  updateMateria(){
    this._materias.updateMateria( this.dataMateria._id,this.materiaForm.value)
    .then(res=>{
      this.close()

      Swal.fire({
  
        icon: 'success',
        title: 'Materia actualizada',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch(error=>{
      console.warn(error);
      
    })
  }

  close() {
    this.dialogRef.close();
  }
}
