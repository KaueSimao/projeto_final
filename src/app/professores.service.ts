import { Professores } from './professores';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {
  url = "http://localhost:3000/client";

  constructor(private http: HttpClient) { }

  getProfessores(): Observable<Professores[]> {
    return this.http.get<Professores[]>(this.url)
  }

  getProfessor(id: number): Observable<Professores[]> {
    return this.http.get<Professores[]>(`${this.url}/${id}`);
  }

  save(professor: Professores): Observable<Professores> {
    return this.http.post<Professores>(this.url, professor);
  }
  update(professor: Professores): Observable<Professores> {
    return this.http.put<Professores>(`${this.url}/${professor.idProfessor}`, professor);
  }
  delete(professor: Professores): Observable<void> {
    return this.http.delete<void>(`${this.url}/${professor.idProfessor}`);
  }
}
