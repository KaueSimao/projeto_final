import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alunos } from './alunos';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  url = "http://localhost:3000/client";

  constructor(private http: HttpClient) { }
  getalunos(): Observable<Alunos[]> {
    return this.http.get<Alunos[]>(this.url)
  }
  getaluno(id: number): Observable<Alunos[]> {
    return this.http.get<Alunos[]>(`${this.url}/${id}`);
  }


  save(alunos: Alunos): Observable<Alunos> {
    return this.http.post<Alunos>(this.url, alunos);
  }
  update(alunos: Alunos): Observable<Alunos> {
    return this.http.put<Alunos>(`${this.url}/${alunos.idAluno}`, alunos);
  }
  delete(alunos: Alunos): Observable<void> {
    return this.http.delete<void>(`${this.url}/${alunos.idAluno}`);
  }
}
