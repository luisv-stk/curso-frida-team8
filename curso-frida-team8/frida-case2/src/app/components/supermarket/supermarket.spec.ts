import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supermarket } from './supermarket';

describe('Supermarket', () => {
  let component: Supermarket;
  let fixture: ComponentFixture<Supermarket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supermarket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Supermarket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
