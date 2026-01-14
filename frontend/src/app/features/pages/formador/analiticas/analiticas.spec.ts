import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analiticas } from './analiticas';

describe('Analiticas', () => {
  let component: Analiticas;
  let fixture: ComponentFixture<Analiticas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Analiticas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Analiticas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
