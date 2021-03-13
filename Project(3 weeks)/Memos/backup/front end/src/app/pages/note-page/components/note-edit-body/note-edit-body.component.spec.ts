import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditBodyComponent } from './note-edit-body.component';

describe('NoteEditBodyComponent', () => {
  let component: NoteEditBodyComponent;
  let fixture: ComponentFixture<NoteEditBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteEditBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
