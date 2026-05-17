import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-frete',
  standalone: true,
  imports: [ReactiveFormsModule], // Adicionado aqui!
  templateUrl: './frete.component.html',
  styleUrl: './frete.component.scss'
})

export class FreteComponent implements OnInit {
  formularioFrete = new FormGroup({
    id: new FormControl(''),
    uf: new FormControl(''),
    bairro: new FormControl(''),
    cep: new FormControl(''),
    valorFrete: new FormControl('')
  });

  ngOnInit() {
    
  }
  salvarFrete(): void {
    console.log(this.formularioFrete.value)
  }
}