import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registros } from 'src/interfaces/registros';  
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrosService {


  private apiUrl = 'http://localhost:3000/registros'; 
  private imagenSeleccionadaSubject = new BehaviorSubject<Registros | null>(null);
  imagenSeleccionada$ = this.imagenSeleccionadaSubject.asObservable();
  
  constructor(private http: HttpClient) {}

 
  cargarRegistro(registro: Registros): Observable<Registros> {
    return this.http.post<Registros>(this.apiUrl, registro); 
  }

 
  obtenerRegistros(): Observable<Registros[]> {
    return this.http.get<Registros[]>(this.apiUrl);  
  }


  actualizarRegistro(registro: Registros): Observable<Registros> {
    return this.http.put<Registros>(`${this.apiUrl}/${registro.id}`, registro);  
  }

 
  eliminarRegistro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el registro:', error);
        return throwError(error);  
      })
    );
  }


  private generarCodigoQR(registro: Registros): void {
    registro.qrData = `Asignatura: ${registro.asignatura}\nFecha: ${new Date().toLocaleDateString()}\nProfesor: ${registro.profesor}`;
    console.log('Código QR generado:', registro.qrData);
  }
}
