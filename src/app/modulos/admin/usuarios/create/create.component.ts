import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }

    fgValidacionU = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
    });
  
  ngOnInit(): void {
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
