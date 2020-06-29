import { MateriasService } from './../../../services/materias/materias.service';
import { CalendarioService } from './../../../services/testeo/calendario/calendario.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent implements OnInit {

  stardDate
  endDate
  dateTest
  dateMes
  dateDia
  dateAnio
  eventForm: FormGroup;
  materiasSub: Subscription;
  materiasObs$: Observable<any>;
  materiasData: any;
  constructor(
    // public dialogRef: MatDialogRef<CrearEventoComponent>,

    // @Inject(MAT_DIALOG_DATA) public data,
    private _calendario: CalendarioService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private _materias: MateriasService,
    private router: Router,

  ) {

    this.stardDate = this.route.snapshot.paramMap.get("id");
    this.dateMes = new Date(this.stardDate).getMonth();
    this.dateDia = new Date(this.stardDate).getDate();
    // this.dateAnio = new Date(this.stardDate)
    // console.log(this.dateAnio)
  }

  ngOnInit(): void {
    this.loadMaterias();
    this.loadForm();
  }
  loadMaterias() {
    this.materiasObs$ = this._materias.getMaterias();
    this.materiasSub = this.materiasObs$.subscribe(res => {
      this.materiasData = res;
      this.materiasSub.unsubscribe();
    })
  }

  loadForm() {
    this.eventForm = this.formBuilder.group(
      {
        //Es decripcion
        name: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        end: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        start: new FormControl(
          this.stardDate,
          Validators.compose([
            Validators.required,
          ])
        ),
        materia: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        ),
        //Es nombre de actividad
        title: new FormControl(
          '',
          Validators.compose([
            Validators.required,
          ])
        )
      },
    );
  }

  addEvento() {
    const f = new Date(this.stardDate)
    const test = new Date(f.getFullYear(), f.getMonth(), f.getDate()).toDateString();
    const hora = this.eventForm.value.end
    const dateConcatenar = test + " " + hora
    const f3 = new Date(dateConcatenar)
    console.log(this.eventForm.value.materia._id);

    const data = {
      start: f,
      end: f3,
    }

    this._calendario.addEvento(data, this.eventForm.value).then(res => {
      this.router.navigate(['/calendario']);

      Swal.fire({
        icon: 'success',
        title: 'Evento agregado',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch(error => {

    })
  }

}
