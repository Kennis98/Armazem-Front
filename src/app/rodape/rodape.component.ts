import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.scss'
})
export class RodapeComponent {
  readonly ano = new Date().getFullYear();
  readonly demo = environment.useMock;
  readonly whatsappUrl = `https://wa.me/${environment.whatsappNumber}`;
}
