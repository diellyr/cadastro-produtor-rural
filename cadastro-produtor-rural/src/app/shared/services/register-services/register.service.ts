import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Register } from 'src/app/interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly API = 'http://localhost:3000/registers'

  constructor(private http: HttpClient) { }


  create(register: Register): Observable<Register> {
    return this.http.post<Register>(this.API, register)
  }

  getRegisteredItems(): Observable<Register[]> {
    return this.http.get<Register[]>(this.API);
  }

  deleteRegister(id: number): Observable<Register> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Register>(url);
  }

  edit(register: Register): Observable<Register> {
    const url = `${this.API}/${register.id}`
    return this.http.put<Register>(url, register )
  }

  searchById(id: number): Observable<Register> {
    const url = `${this.API}/${id}`
    return this.http.get<Register>(url)
  }
}
