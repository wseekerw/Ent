import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Quiz, Question, QuestionForSolving } from '../services/interfaces'

@Component({
  selector: 'app-start-quizz',
  templateUrl: './start-quizz.component.html',
  styleUrls: ['./start-quizz.component.scss'],
})
export class StartQuizzComponent implements OnInit {
  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      submittedAnswers: this.fb.array([]),
    });
  }

  questionsAnswered: number = 0;
  questionsCorrect: number = 0;
  questionsLength: number = 0;

  questionsForSolving: QuestionForSolving[] = []

  myForm!: FormGroup;
  quizzForSolving!: Quiz;

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      params.keys.forEach((paramKey) => {
        if (paramKey === 'id') {
          // Get the quiz for solving
          let id = +params.get('id')!;
          this.getQuizzForSolving(id);
        }
      });
    });
  }

  setAnsweredAndCorrectQuestions() { 
    this.questionsAnswered = 0
    this.questionsCorrect = 0
    let questions = this.questionsForSolving
    for(let question of questions) {
      if(question.answered === true) {
        this.questionsAnswered += 1
      } 
      if(question.correct === true) {
        this.questionsCorrect += 1
      }
    }
  }

  get submittedAnswers() {
    return this.myForm.get('submittedAnswers') as FormArray;
  }


  getQuizzForSolving(id: number) {
    this.stateService.getQuizz(id).subscribe((quizz: Quiz) => {
      this.quizzForSolving = quizz;

      // Set questions for solving the quiz
      this.quizzForSolving.questions.forEach((q: Question) => {
        this.submittedAnswers.push(new FormControl('', Validators.required));
        this.questionsForSolving.push({
          question: q.question,
          answer: q.answer,
          answered: false,
          correct:false,
          showAnswer: false,
          lastSlide: false,
        })
      })

      this.questionsForSolving.push({
        question: '',
        answer: '',
        lastSlide: true,
        answered: false,
        correct: false,
        showAnswer: false,
      })
      
      this.questionsLength = this.questionsForSolving.length - 1
    });
  }

  backToQuizzes() {
    this.router.navigate(['quizzes']);
  }

  submitAnswer(question: QuestionForSolving, i: number) {
    let answer = question.answer.toLowerCase();
    let submittedAnswer = this.submittedAnswers.controls[i].value.toLowerCase();
    
    if (submittedAnswer.includes(answer)) {
      this.submittedAnswers.controls[i].disable();
      question.answered = true;
      question.correct = true;
    } else {
      this.submittedAnswers.controls[i].disable();
      question.answered = true;
      question.correct = false;
    }

    this.setAnsweredAndCorrectQuestions()
  }

  showAnswer(question: QuestionForSolving) {
    question.showAnswer = true;
  }
}
