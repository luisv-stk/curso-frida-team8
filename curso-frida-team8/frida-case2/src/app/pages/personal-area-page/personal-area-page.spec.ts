import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaPage } from './personal-area-page';

describe('PersonalAreaPage', () => {
  let component: PersonalAreaPage;
  let fixture: ComponentFixture<PersonalAreaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAreaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
