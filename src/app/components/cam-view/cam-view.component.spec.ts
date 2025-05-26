import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamViewComponent } from './cam-view.component';

describe('CamViewComponent', () => {
  let component: CamViewComponent;
  let fixture: ComponentFixture<CamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
