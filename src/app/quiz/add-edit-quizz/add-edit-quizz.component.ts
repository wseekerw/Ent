import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Question, Quiz, NewQuiz } from '../services/interfaces'

@Component({
  selector: 'app-edit-add-quizz',
  templateUrl: './add-edit-quizz.component.html',
  styleUrls: ['./add-edit-quizz.component.scss'],
})
export class AddEditQuizzComponent implements OnInit {
  public onClose = new Subject<Quiz | NewQuiz>();

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private stateService: StateService,) {}

  quiz!: Quiz;
  quizForm!: FormGroup;
  previouslySavedQuestions: Question[] = []
  selectedPreSavedQuestion: Question | null = null

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  get f() {
    return this.quizForm.controls;
  }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      preSavedQuestion:  new FormControl(null),
      name: new FormControl('', Validators.required),
      questions: this.fb.array([]),
    });

    if (this.quiz) {
      this.quizForm.get('name')?.setValue(this.quiz.name);

      // Set the FormArray
      this.quiz.questions.forEach((q) => {
        this.questions.push(
          this.fb.group({
            question: [q.question, Validators.required],
            answer: [q.answer, Validators.required],
          })
        );
      });
    }

    this.stateService.getQuestions().subscribe(res => {
      this.previouslySavedQuestions = res;
    })
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  addQuestion() {
    this.questions.push(this.newQuestion());
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  selectPreSavedQuestion() {
    // Select a previously saved question
    let questionId = this.quizForm.controls.preSavedQuestion.value;
    this.selectedPreSavedQuestion = this.previouslySavedQuestions.find((q) => q.id === questionId)!
  }

  addPreSavedSelectedQuestion() {
    // Add a question saved on delete quiz
    this.questions.push(
      this.fb.group({
        question: [this.selectedPreSavedQuestion?.question, Validators.required],
        answer: [this.selectedPreSavedQuestion?.answer, Validators.required],
      })
    );
    this.selectedPreSavedQuestion = null
    this.quizForm.get('preSavedQuestion')?.setValue(null)
  }

  submitQuiz() {
    let questionId = 1;
    this.quizForm.value.questions.map((question: Question) => {
      return (question.id = questionId++);
    });
    if (!this.quiz) {
      // Add new quiz

      let quiz = {
        name: this.quizForm.controls.name.value,
        questions: this.quizForm.controls.questions.value,
      }
      this.onClose.next(quiz);
      this.bsModalRef.hide();
    } else {
      // Edit quiz

      let quiz = {
        name: this.quizForm.controls.name.value,
        questions: this.quizForm.controls.questions.value,
        id: this.quiz.id
      }

      this.onClose.next(quiz);
      this.bsModalRef.hide();
    }
  }
}
