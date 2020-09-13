import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MateriasService } from '../../services/materias/materias.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgregarmateriaComponent } from '../../modals/materias/agregarmateria/agregarmateria/agregarmateria.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {
  //Create
  materiaForm: FormGroup

  //load
  materiasObs$: Observable<any>;
  materiasSub: Subscription;
  materias:any;
  constructor(
    private _materias: MateriasService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.loadMaterias();
  } 

  ngOnDestroy(): void {
  this.materiasSub.unsubscribe();
  }
  
  //Load
  loadMaterias(){
    this.materiasObs$ = this._materias.getMaterias();
    this.materiasSub = this.materiasObs$.subscribe(res=>{
      this.materias = res;
      console.log(res);
      
    })
  }
 
  openCrearMAteria(){
    this.dialog.open(AgregarmateriaComponent,{

    })
  }

  openActualizar(data){
    this.dialog.open(AgregarmateriaComponent,{
      data:data
    })
  }

  eliminarMateria(id){
    Swal.fire({
      title: '¿Estás seguro de eliminar la materia?',
      text: "¡No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._materias.deleteMateria(id).then(res=>{
          Swal.fire(
            '¡Eliminado!',
            'Tu materia ha sido eliminada.',
            'success'
          )
          
        })
        .catch(error=>{
          Swal.fire(
            '¡No se guardaron los cambios!',
            'Tu materia no se eliminó',
            'error'
          )
          
        })
        
      }
    })


  }

  gollamda(id){
    this.router.navigate(['/llamada',id]);

  }
}