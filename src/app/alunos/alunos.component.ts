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
export class ClientFormComponent implements OnInit {

  formGroupClient: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private AlunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formGroupClient = formBuilder.group({
      idAluno: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rg: ['', [Validators.required]],
      telefone: ['', [Validators.required]]

    });

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getAlunoById(id);
  }

  getAlunostById(id: number) {
    this.AlunosService.getAluno(idAlunos).subscribe({
      next: data => {
        this.formGroupClient.setValue(data);
        this.isEditing = true;
      }
    })
  }

  save() {
    this.submitted = true;
    if (this.formGroupClient.value) {
      if (this.isEditing) {
        this.AlunosService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          }
        })
      }
      else {
        this.AlunosService.save(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['alunos']);
  }

  get name(): any {
    return this.formGroupClient.get("name");
  }
  get email(): any {
    return this.formGroupClient.get("email");

  }
  get rg(): any {
    return this.formGroupClient.get("rg");
  }
  get telefone(): any {
    return this.formGroupClient.get("telefone");
  }
}
