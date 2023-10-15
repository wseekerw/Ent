import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuizzComponent } from './start-quizz.component';

describe('StartQuizzComponent', () => {
  let component: StartQuizzComponent;
  let fixture: ComponentFixture<StartQuizzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartQuizzComponent]
    });
    fixture = TestBed.createComponent(StartQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
