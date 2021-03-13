import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFlagComponent } from './note-flag.component';

describe('NoteFlagComponent', () => {
  let component: NoteFlagComponent;
  let fixture: ComponentFixture<NoteFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteFlagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
