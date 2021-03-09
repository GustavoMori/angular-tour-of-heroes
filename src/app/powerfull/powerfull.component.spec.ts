import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerfullComponent } from './powerfull.component';

describe('PowerfullComponent', () => {
  let component: PowerfullComponent;
  let fixture: ComponentFixture<PowerfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
