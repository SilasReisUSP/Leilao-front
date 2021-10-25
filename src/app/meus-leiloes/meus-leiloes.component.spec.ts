import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusLeiloesComponent } from './meus-leiloes.component';

describe('MeusLeiloesComponent', () => {
  let component: MeusLeiloesComponent;
  let fixture: ComponentFixture<MeusLeiloesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusLeiloesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusLeiloesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
