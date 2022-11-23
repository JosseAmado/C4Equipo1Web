import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute

    ) { 
      
    } 

    fgValidacionU = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      correo: [{value:'' ,disabled: true}, [Validators.required, Validators.email]],
    });
  
  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id);
  }

  getWithId(id: string){
    this.usuarioService.getWithId(id).subscribe((data: UsuarioModel) => {
      console.log(data)
      this.fgValidacionU.controls["id"].setValue(id)
      this.fgValidacionU.controls["nombre"].setValue(data.nombre as string)
      this.fgValidacionU.controls["apellidos"].setValue(data.apellidos as string)
      this.fgValidacionU.controls["correo"].setValue(data.correo as string)
      this.fgValidacionU.controls["telefono"].setValue(data.telefono as string)
    })
  }

  edit(){
    let usuario = new UsuarioModel();
    usuario.id = this.fgValidacionU.controls["id"].value as string;
    usuario.nombre = this.fgValidacionU.controls["nombre"].value as string;
    usuario.apellidos = this.fgValidacionU.controls["apellidos"].value as string;
    usuario.correo = this.fgValidacionU.controls["correo"].value as string;
    usuario.telefono = this.fgValidacionU.controls["telefono"].value as string;
 
    this.usuarioService.update(usuario).subscribe((data: UsuarioModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


  store(){
    let usuario = new UsuarioModel();
    usuario.nombre = this.fgValidacionU.controls["nombre"].value as string;
    usuario.apellidos = this.fgValidacionU.controls["apellidos"].value as string;
    usuario.correo = this.fgValidacionU.controls["correo"].value as string;
    usuario.telefono = this.fgValidacionU.controls["telefono"].value as string;

    this.usuarioService.store(usuario).subscribe((data: UsuarioModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}
