import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Quiz, Question, State } from './interfaces'

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor() {}

  private mockedQuizzes: Quiz[] = [
    {
      id: 1,
      name: 'Enterwell Quiz',
      questions: [
        {
          id: 1,
          question:
            "Who was the English mathematician and writer widely considered as the worldq's first computer programmer for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine?",
          answer: 'Ada Lovelace',
        },
        {
          id: 2,
          question: 'What RAM stands for?',
          answer: 'Random-access memory',
        },
      ],
    },
    {
      id: 2,
      name: 'Capital cities Quiz',
      questions: [
        {
          id: 1,
          question: 'What is the capital city of France',
          answer: 'Paris',
        },
        { id: 2, question: 'What is the capital city of UK', answer: 'London' },
      ],
    },
  ];

  private mockedQuestions: Question[] = [];

  private _state$ = new BehaviorSubject<State>({
    quizzes: this.mockedQuizzes,
    questions: this.mockedQuestions,
  });

  state$ = this._state$.asObservable();

  get currentState() {
    return this._state$.value;
  }

  getQuizz(id: number): Observable<Quiz> {
    return of(this.currentState.quizzes.find((q) => q.id === id)!)
  }

  getQuestions(): Observable<Question[]> {
    return of(this.currentState.questions)
  }

  setState(propertiesToUpdate: Partial<any>): void {
    const updatedState = { ...this.currentState, ...propertiesToUpdate };
    this._state$.next(updatedState);
  }
}
