import { AlunosService } from './../alunos.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alunos } from '../alunos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  formGroupAluno: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private AlunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formGroupAluno = formBuilder.group({
      idAluno: [''],
      nome: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getAlunoById(id);
  }

  getAlunoById(id: number) {
    this.AlunosService.getalunos().subscribe({
      next: data => {
        this.formGroupAluno.setValue(data);
        this.isEditing = true;
      }
    })
  }

  saveAlunos() {
    this.submitted = true;
    if (this.formGroupAluno.valid) {
      if (this.isEditing) {
        this.AlunosService.update(this.formGroupAluno.value).subscribe({
          next: () => {
            this.router.navigate(['home']);
          }
        })
      }
      else {
        this.AlunosService.save(this.formGroupAluno.value).subscribe({
          next: () => {
            this.router.navigate(['home']);
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['home']);
  }

  get nome(): any {
    return this.formGroupAluno.get("nome");
  }
  get matricula(): any {
    return this.formGroupAluno.get("matricula");

  }
  get email(): any {
    return this.formGroupAluno.get("email");
  }
}
