import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listaRutas: RutaModelo[] = [];
  constructor(private fb: FormBuilder,
    private vueloService: VueloService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      asientos_vendidos: ['', [Validators.required]],
      piloto: ['', [Validators.required]],
      rutasId: ['', [Validators.required]]      
    });

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id);
  }

  getWithId(id: string){
    this.vueloService.getWithId(id).subscribe((data: VueloModelo) => {
      console.log(data)
      this.fgValidacion.controls["fecha_inicio"].setValue(data.fecha_inicio as string)
      this.fgValidacion.controls["hora_inicio"].setValue(data.fecha_fin as string)
      this.fgValidacion.controls["fecha_fin"].setValue(data.fecha_fin as string)
      this.fgValidacion.controls["hora_fin"].setValue(data.fecha_fin as string)
      this.fgValidacion.controls["asientos_vendidos"].setValue(data.asientos_vendidos as string)
      this.fgValidacion.controls["piloto"].setValue(data.rutasId as string)
      this.fgValidacion.controls["rutasId"].setValue(data.rutasId as string)
    })
  }
  
  edit(){
    let vuelo = new VueloModelo();
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string;
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as string;
    vuelo.piloto = this.fgValidacion.controls["piloto"].value as string;
    vuelo.rutasId = this.fgValidacion.controls["rutasId"].value as string;

      this.vueloService.update(vuelo).subscribe((data: VueloModelo)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/vuelo/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
}

  store(){
    let vuelo = new VueloModelo();
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string;
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as string;
    vuelo.piloto = this.fgValidacion.controls["piloto"].value as string;
    vuelo.rutasId = this.fgValidacion.controls["rutasId"].value as string;

      this.vueloService.update(vuelo).subscribe((data: VueloModelo)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/vuelo/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
    }
  }
