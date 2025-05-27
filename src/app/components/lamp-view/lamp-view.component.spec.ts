import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampViewComponent } from './lamp-view.component';

describe('LampViewComponent', () => {
  let component: LampViewComponent;
  let fixture: ComponentFixture<LampViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LampViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LampViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
