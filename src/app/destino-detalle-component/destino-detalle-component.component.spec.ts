import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoDetalleComponentComponent } from './destino-detalle-component.component';

describe('DestinoDetalleComponentComponent', () => {
  let component: DestinoDetalleComponentComponent;
  let fixture: ComponentFixture<DestinoDetalleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinoDetalleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoDetalleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
