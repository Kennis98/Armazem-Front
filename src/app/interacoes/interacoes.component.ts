import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-interacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interacoes.component.html', 
  styleUrl: './interacoes.component.scss'
})
export class InteracoesComponent {
  constructor(public uiService: UiService) {}
}