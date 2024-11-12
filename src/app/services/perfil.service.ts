import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from 'src/interfaces/perfil';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:3000/perfiles'; 
  private imagenSeleccionadaSubject = new BehaviorSubject<Perfil | null>(null);
  imagenSeleccionada$ = this.imagenSeleccionadaSubject.asObservable();
  
  constructor(private http: HttpClient) {}



  cargarPerfil(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(this.apiUrl, perfil);  
  }

 
  obtenerPerfiles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl);  
  }


  actualizarPerfil(perfil: Perfil): Observable<any> {
    return this.http.put(`${this.apiUrl}/${perfil.id}`, perfil);  
  }

 
  eliminarPerfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar la imagen:', error);
        return throwError(error);
      })
    );
  }
}
