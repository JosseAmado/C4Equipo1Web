import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaService } from 'src/app/servicios/ruta.service';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  listaAeropuertos: AeropuertoModel[] = [];

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private aeropuertoService: AeropuertoService,
    private router: Router) { }

    fgValidacionR = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tiempo_estimado: ['', [Validators.required]],
    });
  
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.aeropuertoService.getAll()
    .subscribe((data: AeropuertoModel[]) => {
      console.log(data)
      this.listaAeropuertos = data
    })
  }

  store(){
    let ruta = new RutaModelo();
    ruta.origenaeropuertoId = this.fgValidacionR.controls["origen"].value as string;
    ruta.destinoaeropuertoId = this.fgValidacionR.controls["destino"].value as string;
    ruta.tiempo_estimado = this.fgValidacionR.controls["tiempo_estimado"].value as string;

    this.rutaService.store(ruta)
    .subscribe((data: RutaModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}