import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listaAeropuertos: AeropuertoModel[] =[];

  constructor(private fb: FormBuilder,
    private rutasService: RutaService,
    private aeropuertoService: AeropuertoService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacionR = this.fb.group({
      origenaeropuertoId: ['', [Validators.required]],
      destinoaeropuertoId: ['', [Validators.required]],
      tiempo_estimado: ['', [Validators.required]]
    });

  ngOnInit(): void {
    let id =this.route.snapshot.params["id"]
    this.getWithId(id);
    this.getAll();
    
  }

  getAll(){
    this.aeropuertoService.getAll()
    .subscribe((data: AeropuertoModel[]) => {
      console.log(data)
      this.listaAeropuertos = data
    })
  }
  getWithId(id:string){
    this.rutasService.getWithId(id).subscribe((data: RutaModelo) => {
      this.fgValidacionR.controls["origenaeropuertoId"].setValue(data.origenaeropuertoId as string)
      this.fgValidacionR.controls["destinoaeropuertoId"].setValue(data.destinoaeropuertoId as string)
      this.fgValidacionR.controls["tiempo_estimado"].setValue(data.tiempo_estimado as string)
    })
  }

  edit(){
    let ruta = new RutaModelo();
    ruta.origenaeropuertoId = this.fgValidacionR.controls["origenaeropuertoId"].value as string;
    ruta.destinoaeropuertoId = this.fgValidacionR.controls["destinoaeropuertoId"].value as string;
    ruta.tiempo_estimado = this.fgValidacionR.controls["tiempo_estimado"].value as string;

    this.rutasService.update(ruta).subscribe((data: RutaModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  store(){
    let ruta = new RutaModelo();
    ruta.origenaeropuertoId = this.fgValidacionR.controls["origenaeropuertoId"].value as string;
    ruta.destinoaeropuertoId = this.fgValidacionR.controls["destinoaeropuertoId"].value as string;
    ruta.tiempo_estimado = this.fgValidacionR.controls["tiempo_estimado"].value as string;

    this.rutasService.update(ruta).subscribe((data: RutaModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}
