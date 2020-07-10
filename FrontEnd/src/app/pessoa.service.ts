import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from './pessoa';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  url = 'https://localhost:44357/api/pessoas';

  constructor(private http: HttpClient) {}

  getAllPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url);
  }

  getPessoaById(pessoaId: number): Observable<Pessoa> {
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  createPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  updatePessoa(pessoaId: number, pessoa: Pessoa): Observable<Pessoa> {
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.put<Pessoa>(apiUrl, pessoa, httpOptions);
  }

  deletePessoaById(pessoaId: number): Observable<number> {
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
