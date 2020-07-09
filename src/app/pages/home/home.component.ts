import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilAmigoComponent } from '../../modals/perfil-amigo/perfil-amigo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(

    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }


  buscarPerfilAmigo() {
    this.dialog.open(PerfilAmigoComponent, {
      width: "500px"
    })
  }
}
