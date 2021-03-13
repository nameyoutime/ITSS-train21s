import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNoteDialogComponent } from './share-note-dialog.component';

describe('ShareNoteDialogComponent', () => {
  let component: ShareNoteDialogComponent;
  let fixture: ComponentFixture<ShareNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
