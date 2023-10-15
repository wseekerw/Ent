import { NgModule } from '@angular/core';
import { QuizzesComponent } from './quiz/quizzes/quizzes.component';
import { StartQuizzComponent } from './quiz/start-quizz/start-quizz.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quizzes',
    pathMatch: 'full'
  },
  {
    path: 'quizzes',
    component: QuizzesComponent,
  },
  {
    path: 'quizzes/:id',
    component: StartQuizzComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
