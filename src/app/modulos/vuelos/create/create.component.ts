import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VueloService } from 'src/app/servicios/vuelo.service';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vueloService: VueloService,
    private router: Router) { }

  fgValidacionV = this.fb.group({
    fecha_inicio: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    asientos_vendidos: ['', [Validators.required]],
    nombre_piloto: ['', [Validators.required]],
    rutasId: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  store(){
    let vuelo = new VueloModelo();
    vuelo.fecha_inicio = this.fgValidacionV.controls["fecha_inicio"].value as string;
    vuelo.hora_inicio = this.fgValidacionV.controls["hora_inicio"].value as string;
    vuelo.asientos_vendidos = this.fgValidacionV.controls["asientos_vendidos"].value as string;
    vuelo.nombre_piloto = this.fgValidacionV.controls["nombre_piloto"].value as string;
    vuelo.rutasId = this.fgValidacionV.controls["rutasId"].value as string;

    this.vueloService.store(vuelo)
    .subscribe((data: VueloModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
