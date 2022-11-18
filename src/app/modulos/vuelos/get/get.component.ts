import { Component, OnInit } from '@angular/core';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private vueloService: VueloService) { }

  listado: VueloModelo[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.vueloService.getAll()
    .subscribe((data: VueloModelo[]) => {
      console.log("🚀 ~ file: get.component.ts ~ getAll", data)
      this.listado = data;
    });
  }

  delete(id?: any) {
    console.log("🚀 ~ file: get.component.ts ~ line 29 ~ delete", id);
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vueloService
        .delete(id)
        .subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }
}
