import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfscPageComponent } from './ifsc-page.component';

describe('IfscPageComponent', () => {
  let component: IfscPageComponent;
  let fixture: ComponentFixture<IfscPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfscPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfscPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
