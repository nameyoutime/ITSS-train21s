import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelonComponent } from './excelon.component';

describe('ExcelonComponent', () => {
  let component: ExcelonComponent;
  let fixture: ComponentFixture<ExcelonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
