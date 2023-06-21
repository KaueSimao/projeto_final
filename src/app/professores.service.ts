import { Professores } from './professores';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {
  url = "http://localhost:3000/professores";

  constructor(private http: HttpClient) { }

  getProfessores(): Observable<Professores[]> {
    return this.http.get<Professores[]>(this.url)
  }

  getProfessor(id: number): Observable<Professores[]> {
    return this.http.get<Professores[]>(`${this.url}/${id}`);
  }

  saveProf(professor: Professores): Observable<Professores> {
    return this.http.post<Professores>(this.url, professor);

}
}
