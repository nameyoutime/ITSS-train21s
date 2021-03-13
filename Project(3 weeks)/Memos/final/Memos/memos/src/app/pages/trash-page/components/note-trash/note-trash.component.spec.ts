import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTrashComponent } from './note-trash.component';

describe('NoteTrashComponent', () => {
  let component: NoteTrashComponent;
  let fixture: ComponentFixture<NoteTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteTrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
