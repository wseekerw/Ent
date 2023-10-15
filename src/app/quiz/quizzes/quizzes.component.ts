import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddEditQuizzComponent } from '../add-edit-quizz/add-edit-quizz.component';
import { Router } from '@angular/router';
import { Quiz, Question } from '../services/interfaces'

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  constructor(
    private stateService: StateService,
    private modalService: BsModalService,
    private router: Router
  ) {}
  bsModalRef?: BsModalRef;
  quizzes: Quiz[] = [];
  savedQuestions: Question[] = []

  ngOnInit(): void {
    this.stateService.state$.subscribe((state) => {
      this.quizzes = state.quizzes;
      this.savedQuestions = state.questions
      console.log(state);
    });
  }

  openAddQuizzModal() {
    this.bsModalRef = this.modalService.show(AddEditQuizzComponent);
    this.bsModalRef.content.onClose.subscribe((data: Quiz) => {
      this.addQuiz(data);
    });
  }

  openEditQuizModal(quiz: Quiz) {
    const initialState = {
      quiz: quiz
    };
    this.bsModalRef = this.modalService.show(AddEditQuizzComponent, {
      initialState,
    });
    this.bsModalRef.content.onClose.subscribe((data: Quiz) => {    
        this.editQuiz(data)
    });
  }

  addQuiz(newQuiz: any) {
    let newId;
    // Add id for added quiz
    let lastId = this.quizzes.slice(-1)[0]?.id;
    lastId ? (newId = lastId + 1) : (newId = 1);
    const update = {
      id: newId,
      name: newQuiz.name,
      questions: newQuiz.questions,
    };
    this.quizzes.push(update);
    this.stateService.setState({quizzes: [...this.quizzes]});
  }

  editQuiz(editedQuiz: Quiz) {

    this.quizzes.forEach((element: Quiz, index: number) => {
      if (element.id === editedQuiz.id) {
        this.quizzes[index] = editedQuiz;
      }
    });

    this.stateService.setState({quizzes: [...this.quizzes]});
  }

  deleteQuiz(quizz: Quiz, index: number) {
    let updatedQuestions;
    let questionId = 1;
    const questionsForSaving = this.quizzes.filter((q:any) => q.id === quizz.id)[0].questions;
    updatedQuestions = {questions: [...this.savedQuestions, ...questionsForSaving]}
    updatedQuestions.questions.map((question: any) => {
      return (question.id = questionId++);
    });
    // Update saved questions on delete quiz
    this.stateService.setState(updatedQuestions)

    this.quizzes.splice(index, 1);
    
    this.stateService.setState({quizzes: [...this.quizzes]});
  }

  startQuiz(id: number) {
    this.router.navigate(['quizzes', id]);
  }
}
