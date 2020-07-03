import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-anadir-amigos',
  templateUrl: './anadir-amigos.component.html',
  styleUrls: ['./anadir-amigos.component.scss']
})
export class AnadirAmigosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AnadirAmigosComponent>,

  ) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
}
