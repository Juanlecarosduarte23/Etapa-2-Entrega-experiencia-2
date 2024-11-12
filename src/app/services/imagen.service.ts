import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagen } from 'src/interfaces/imagen';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {

  private apiUrl = 'http://localhost:3000/imagenes'; 
  private imagenSeleccionadaSubject = new BehaviorSubject<Imagen | null>(null);
  imagenSeleccionada$ = this.imagenSeleccionadaSubject.asObservable();
  constructor(private http: HttpClient) { }


  cargarImagen(imagen: Imagen): Observable<Imagen> {
    return this.http.post<Imagen>(this.apiUrl, imagen); 
  }

 
  obtenerImagenes(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.apiUrl); 
  }

 
  actualizarImagen(imagen: Imagen): Observable<any> {
    return this.http.put(`${this.apiUrl}/imagenes/${imagen.id}`, imagen);
  }


  eliminarImagen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar la imagen:', error);
        return throwError(error);
      })
    );
  }
}


  
