import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGestion } from './panel-gestion';

describe('PanelGestion', () => {
  let component: PanelGestion;
  let fixture: ComponentFixture<PanelGestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelGestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelGestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
