import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApidatosService {

  private apiUrl = 'http://localhost:3000/images'; 

  constructor(private http: HttpClient) {}

  updateImage(id: number, imageData: { image: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, imageData);
  }
}