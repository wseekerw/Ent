import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { AddEditQuizzComponent } from './add-edit-quizz/add-edit-quizz.component';
import { StartQuizzComponent } from './start-quizz/start-quizz.component';

@NgModule({
  declarations: [
    QuizzesComponent,
    AddEditQuizzComponent,
    StartQuizzComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    NgSelectModule,
    ModalModule
  ],
  providers: [BsModalService],
})
export class QuizModule {}
