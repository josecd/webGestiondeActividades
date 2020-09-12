import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TareasService } from '../../../services/tareas/tareas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.scss']
})
export class AgregarTareaComponent implements OnInit {

  tareaForm: FormGroup;
  dataTarea
    
  constructor(

  private _tareas: TareasService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) {
   this.dataTarea = data;
    console.log(data);
    
   }

  ngOnInit(): void {``
    this.loadForm();
  }

  //Create
  loadForm(){
    if(this.dataTarea){
     this.tareaForm =this.formBuilder.group(
       {
         nombreTarea: new FormControl(
           this.dataTarea.title,
           Validators.compose([
             Validators.required
           ])
         ),
         nombreMaestro: new FormControl(
           this.dataTarea.name,
           Validators.compose([
             Validators.required
           ])
         )
       }
     )
    }else{
     this.tareaForm =this.formBuilder.group(
       {
         nombreTarea: new FormControl(
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

 addTarea(){
   this._tareas.addTarea(this.tareaForm.value)
   .then(res=>{
     this.close()
     console.log('Tarea agregada');
   })
   .catch(error=>{
     console.warn(error);
     
   })
}

updateTarea(){
  this._tareas.updateTarea( this.dataTarea._id,this.tareaForm.value)
  .then(res=>{
    this.close()

    Swal.fire({

      icon: 'success',
      title: 'Tarea actualizada',
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
