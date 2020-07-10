import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
})
export class PessoaComponent implements OnInit {
  dataSaved = false;
  pessoaForm: any;
  allPessoas: Observable<Pessoa[]>;
  pessoaIdUpdate = null;
  message = null;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    this.pessoaForm = this.formBuilder.group({
      Nome: ['Nome', [Validators.required]],
      Idade: ['Idade', [Validators.required]],
    });

    this.loadAllPessoas();
  }

  loadAllPessoas(): void {
    this.allPessoas = this.pessoaService.getAllPessoas();
  }

  onFormSubmit(): void {
    this.dataSaved = false;
    const pessoa = this.pessoaForm.value;
    this.CreatePessoa(pessoa);
    this.pessoaForm.reset();
  }

  CreatePessoa(pessoa: Pessoa): void {
    if (this.pessoaIdUpdate == null) {
      this.pessoaService.createPessoa(pessoa).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro salvo';
        this.loadAllPessoas();
        this.pessoaIdUpdate = null;
        this.pessoaForm.reset();
      });
    } else {
      pessoa.pessoaId = this.pessoaIdUpdate;
      this.pessoaService
        .updatePessoa(this.pessoaIdUpdate, pessoa)
        .subscribe(() => {
          this.dataSaved = true;
          this.message = 'Registro atualizado';
          this.loadAllPessoas();
          this.pessoaIdUpdate = null;
          this.pessoaForm.reset();
        });
    }
  }

  loadPessoaToEdit(pessoaId: number): void {
    this.pessoaService.getPessoaById(pessoaId).subscribe((pessoa) => {
      console.log(pessoa);
      this.message = null;
      this.dataSaved = false;
      this.pessoaIdUpdate = pessoa.pessoaId;
      this.pessoaForm.patchValue({
        Nome: pessoa.nome,
        Idade: pessoa.idade
      });
    });
  }

  deletePessoa(pessoaId: number): void {
    if (confirm('Deseja realmente deletar este aluno ?')) {
      this.pessoaService.deletePessoaById(pessoaId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro deletado com sucesso';
        this.loadAllPessoas();
        this.pessoaIdUpdate = null;
        this.pessoaForm.reset();
      });
    }
  }

  resetForm(): void {
    this.pessoaForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
