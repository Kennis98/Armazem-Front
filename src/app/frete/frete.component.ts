import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrincipalSerivice } from '../service/principal.service';
import { Frete } from '../interfaces/frete';

@Component({
  selector: 'app-frete',
  standalone: true,
  imports: [ReactiveFormsModule], // Adicionado aqui!
  templateUrl: './frete.component.html',
  styleUrl: './frete.component.scss'
})

export class FreteComponent implements OnInit {
  formularioFrete = new FormGroup({
    id: new FormControl(0),
    uf: new FormControl('',[Validators.required]),
    bairro: new FormControl('',[Validators.required]),
    cep: new FormControl('',[Validators.required]),
    valorFrete: new FormControl(0,[Validators.required])
  });
  fretes: Array<Frete> = [];

  constructor(private service: PrincipalSerivice) { }

  ngOnInit() {
    this.buscarFretes();
  }
  salvarFrete(): void {
    const freteCadastro = this.formularioFrete.getRawValue() as Frete;
    this.service.cadastrarFrete(freteCadastro).subscribe(res => { 
      this.buscarFretes();
    })
  }
  buscarFretes() {
    this.service.buscarFretes().subscribe(res => {
      this.fretes = res;
    })
  }
}