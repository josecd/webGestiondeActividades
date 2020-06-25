import { CalendarioService } from './../../../services/testeo/calendario/calendario.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


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
  constructor(
    // public dialogRef: MatDialogRef<CrearEventoComponent>,

    // @Inject(MAT_DIALOG_DATA) public data,
    private _calendario : CalendarioService,
    private route: ActivatedRoute,

  ) { 
    
    this.stardDate = this.route.snapshot.paramMap.get("id");
    this.dateMes = new Date(this.stardDate).getHours();

  }

  ngOnInit(): void {
  }

  addEvento(){
    
    const data={
      title: 'test',
      name:'test',
      start: this.stardDate,
      end: this.endDate,
    }
    console.log(data);
    console.warn(this.dateMes);
    
    
    // this._calendario.addEvento(data);
  }

}
