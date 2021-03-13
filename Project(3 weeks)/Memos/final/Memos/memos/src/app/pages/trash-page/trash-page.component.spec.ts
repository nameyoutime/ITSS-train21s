import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashPageComponent } from './trash-page.component';

describe('TrashPageComponent', () => {
  let component: TrashPageComponent;
  let fixture: ComponentFixture<TrashPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
