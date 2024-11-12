import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  GetAllUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  GetUserByUsername(usuario:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${usuario}`);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  PostUsuario(newUsuario:UserNuevo): Observable<UserNuevo>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  
  GetUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  
}
