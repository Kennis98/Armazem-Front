import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteracoesComponent } from './interacoes.component';

describe('InteracoesComponent', () => {
  let component: InteracoesComponent;
  let fixture: ComponentFixture<InteracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteracoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
