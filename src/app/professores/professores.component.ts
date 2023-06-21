import { ProfessoresService } from './../professores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';
import { Professores } from '../professores';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  professores: Professores[] = [];
  FormGroupProf: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = true;


  constructor(private ProfessoresService: ProfessoresService, formBuilder: FormBuilder) {
    this.FormGroupProf = formBuilder.group({
      idProfessor: [''],
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {
    this.loadProfessor();
  }
  loadProfessor() {
    this.ProfessoresService.getProfessores().subscribe(
      {
        next: data => this.professores = data
      }
    )
  }

  saveProf() {
    this.submitted = true;
    if (this.FormGroupProf.valid) {
      if (this.isEditing) {
        this.ProfessoresService.saveProf(this.FormGroupProf.value).subscribe({
          next: data => {
            this.loadProfessor();
            this.FormGroupProf.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        });
      } else {
        this.ProfessoresService.saveProf(this.FormGroupProf.value).subscribe({
          next: data => {
            this.professores.push(data);
            this.FormGroupProf.reset();
          }
        });
      }
    }
  }
  get nome(): any {
    return this.FormGroupProf.get("nome");
  }
  get rg(): any {
    return this.FormGroupProf.get("rg");
  }
  get email(): any {
    return this.FormGroupProf.get("email");
  }

}
