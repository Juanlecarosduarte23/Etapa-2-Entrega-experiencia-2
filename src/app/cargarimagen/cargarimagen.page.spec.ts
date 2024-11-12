import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargarimagenPage } from './cargarimagen.page';

describe('CargarimagenPage', () => {
  let component: CargarimagenPage;
  let fixture: ComponentFixture<CargarimagenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarimagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
