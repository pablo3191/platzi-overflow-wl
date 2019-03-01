import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionScreenComponent } from './question/question-screen.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';
import { QUESTION_ROUTES } from './question/question.routing';

// APP_ROUTES
const routes: Routes = [
  { path: '', component: QuestionScreenComponent, pathMatch: 'full' }, 
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: SignupScreenComponent },
  { path: 'questions', children: QUESTION_ROUTES }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
