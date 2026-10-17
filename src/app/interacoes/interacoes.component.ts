import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-interacoes',
  standalone: true,
  imports: [AsyncPipe, MatIconModule],
  templateUrl: './interacoes.component.html',
  styleUrl: './interacoes.component.scss'
})
export class InteracoesComponent {
  constructor(public uiService: UiService) {}
}
