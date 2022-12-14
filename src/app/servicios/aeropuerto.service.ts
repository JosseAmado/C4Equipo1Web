import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AeropuertoModel } from '../modelos/aeropuerto.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {

  url = "https://apiloopbackeq1misiontic.herokuapp.com"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 

      this.token = this.seguridadService.getToken();
    }

    store(aeropuerto: AeropuertoModel): Observable<AeropuertoModel> {
      return this.http.post<AeropuertoModel>(`${this.url}/aeropuertos`, {
        nombre: aeropuerto.nombre,
        ciudad: aeropuerto.ciudad,
        pais: aeropuerto.pais,
        coord_x: aeropuerto.coord_x,
        coord_y: aeropuerto.coord_y,
        siglas: aeropuerto.siglas,
        tipo: aeropuerto.tipo
      });
    }

    
    getAll(): Observable<AeropuertoModel[]>{
        return this.http.get<AeropuertoModel[]>(`${this.url}/aeropuertos`, {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${this.token}`
          })
        })
    }

    update(aeropuerto: AeropuertoModel): Observable<AeropuertoModel> {
      return this.http.patch<AeropuertoModel>(`${this.url}/aeropuertos/${aeropuerto.id}`, {
        nombre: aeropuerto.nombre,
        ciudad: aeropuerto.ciudad,
        pais: aeropuerto.pais,
        coord_x: aeropuerto.coord_x,
        coord_y: aeropuerto.coord_y,
        siglas: aeropuerto.siglas,
        tipo: aeropuerto.tipo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<AeropuertoModel[]>{
      return this.http.delete<AeropuertoModel[]>(`${this.url}/aeropuertos/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<AeropuertoModel>{
      return this.http.get<AeropuertoModel>(`${this.url}/aeropuertos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getCount(): Observable<AeropuertoModel[]>{
      return this.http.get<AeropuertoModel[]>(`${this.url}/aeropuertos/count`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }) 
    }

}