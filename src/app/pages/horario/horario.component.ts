import { ActivatedRoute } from '@angular/router';
import { HorarioService } from './../../services/horario/horario.service';
import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),

  });
  imageSrc1: any = "../../../assets/img/horario-default.png"

  imageSrc
  estadoImg
  idHorario
  idAmigo
  constructor(
    private _storageService: StorageService,
    private _horario: HorarioService,
    private route: ActivatedRoute,

  ) { 
    this.idAmigo = this.route.snapshot.paramMap.get("id");

  }

  ngOnInit(): void {
    if (!this.idAmigo) {
    this.getHorario();
      
    } else {
      this.getHorarioAmigo();
    }
  }

  public cambioArchivo(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }
  async subirArchivo() {
    Swal.fire({
      title: 'Subiendo la imagen...',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        let archivo = this.datosFormulario.get('archivo');
        this._storageService.uploadHorario(archivo).then(res => {
          this.imageSrc = res;

          this._horario.subirHorario(this.imageSrc).then(res => {
          
            this.datosFormulario.delete('archivo');

            this.mensajeArchivo = 'No hay un archivo seleccionado';
            this.datosFormulario = new FormData();
            this.nombreArchivo = '';
            this.URLPublica = '';
            this.archivoForm.value.archivo = null
            this.getHorario();
            Swal.hideLoading()
          })
        })

      }
    })
  }

  getHorario() {
    this._horario.getHorarioExiste().then(res => {
      if (res) {
        this.imageSrc1 = res.link
        this.idHorario = res._id
        this.estadoImg = true
      } else {
        this.estadoImg = false
      }

    })
  }

  getHorarioAmigo() {
    this._horario.getHorarioExisteAmigo(this.idAmigo).then(res => {
      if (res) {
        this.imageSrc1 = res.link
        this.idHorario = res._id
        this.estadoImg = true
      } else {
        this.estadoImg = false
      }

    })
  }

  eliminarHorario() {
    Swal.fire({
      title: 'Eliminando horario.',
      html: '',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        this._horario.eliminaHorario(this.idHorario)
          .then(res => {
            this.imageSrc1 = "../../../assets/img/horario-default.png";
            this.getHorario();
            Swal.hideLoading();
            this.datosFormulario = new FormData();

          }).catch(error => {
            this.getHorario();
            Swal.hideLoading();
          })
      }
    })
  }
}
