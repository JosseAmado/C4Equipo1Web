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
      fecha_fin: ['', [Validators.required]],
      asientos_vendidos: ['', [Validators.required]],
      rutasId: ['', [Validators.required]],      
    });

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id);
  }

  getWithId(id: string){
    this.vueloService.getWithId(id).subscribe((data: VueloModelo) => {
      console.log(data)
      this.fgValidacion.controls["fecha_inicio"].setValue(data.fecha_inicio as string)
      this.fgValidacion.controls["fecha_fin"].setValue(data.fecha_fin as string)
      this.fgValidacion.controls["asientos_vendidos"].setValue(data.asientos_vendidos as string)
      this.fgValidacion.controls["rutasId"].setValue(data.rutasId as string)
    })
  }
  
  edit(){
    let usuario = new VueloModelo();
    usuario.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string;
    usuario.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;
    usuario.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as string;
    usuario.rutasId = this.fgValidacion.controls["rutasId"].value as string;

      this.vueloService.update(usuario).subscribe((data: VueloModelo)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/vuelos/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
}

  store(){
    let usuario = new VueloModelo();
    usuario.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value as string;
    usuario.fecha_fin = this.fgValidacion.controls["fecha_fin"].value as string;
    usuario.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value as string;
    usuario.rutasId = this.fgValidacion.controls["rutasId"].value as string;

      this.vueloService.update(usuario).subscribe((data: VueloModelo)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/vuelos/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
    }
  }
