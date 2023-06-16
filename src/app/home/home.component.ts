import { Professores } from './../professores';
import { AlunosService } from './../alunos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alunos } from '../alunos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alunos: Alunos[] = [];
  professores : Professores [] = [];

  constructor(private AlunosService: AlunosService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadAlunos();
  }
  loadAlunos() {
    this.AlunosService.getalunos().subscribe(
      {
        next: data => this.alunos = data
      }
    );
  }
  create() {
    this.router.navigate(['Createalunos']);
  }
  edit(alunos: Alunos) {
    this.router.navigate(['alunosDetails', alunos.idAluno]);
  }

  delete(alunos: Alunos) {
    this.AlunosService.delete(alunos).subscribe({
      next: () => this.loadAlunos()
    })
  }
  
}
