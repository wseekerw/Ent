import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AddEditQuizzComponent } from './add-edit-quizz.component';

describe('AddQuizzComponent', () => {
  let component: AddEditQuizzComponent;
  let fixture: ComponentFixture<AddEditQuizzComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditQuizzComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    });
    fixture = TestBed.createComponent(AddEditQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a pre-saved selected question to the form', () => {
    // Arrange
    component.selectedPreSavedQuestion = {
      question: 'Sample Question',
      answer: 'Sample Answer',
      id: 1
    };

    // Act
    component.addPreSavedSelectedQuestion();

    // Assert
    const formArray = component.quizForm.get('questions') as FormArray;
    expect(formArray.length).toBe(1); // Make sure a new form group was added
    const addedQuestionGroup = formArray.at(0) as FormGroup;
    expect(addedQuestionGroup.controls['question'].value).toBe('Sample Question');
    expect(addedQuestionGroup.controls['answer'].value).toBe('Sample Answer');
    expect(component.selectedPreSavedQuestion).toBeNull();
    expect(component.quizForm.get('preSavedQuestion')!.value).toBeNull();
  });

  it('should not add a question if selectedPreSavedQuestion is null', () => {
    // Arrange
    component.selectedPreSavedQuestion = null;

    // Act
    component.addPreSavedSelectedQuestion();

    // Assert
    const formArray = component.quizForm.get('questions') as FormArray;
    expect(formArray.length).toBe(0); // No new form group should be added
    expect(component.selectedPreSavedQuestion).toBeNull();
    expect(component.quizForm.get('preSavedQuestion')!.value).toBeNull();
  });
});
