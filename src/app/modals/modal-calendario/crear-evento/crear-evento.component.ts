import { CalendarioService } from './../../../services/testeo/calendario/calendario.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';


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
  constructor(
    // public dialogRef: MatDialogRef<CrearEventoComponent>,

    // @Inject(MAT_DIALOG_DATA) public data,
    private _calendario : CalendarioService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,

  ) { 
    
    this.stardDate = this.route.snapshot.paramMap.get("id");
    this.dateMes = new Date(this.stardDate).getMonth();
    this.dateDia = new Date(this.stardDate).getDate();
    // this.dateAnio = new Date(this.stardDate)
    // console.log(this.dateAnio);
    

    

  }

  ngOnInit(): void {
    this.loadForm();
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

  addEvento(){
    const f = new Date(this.stardDate)    
    const test = new Date(f.getFullYear(),f.getMonth(),f.getDate()).toDateString();
    const hora = this.eventForm.value.end
    const dateConcatenar = test+" " + hora
    const f3 = new Date(dateConcatenar)
    const data={
      title: 'test',
      name:'test',
      start: f,
      end: f3,
    }
    
     this._calendario.addEvento(data);
  }

}
