import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/question-list.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';

// APP_ROUTES
const routes: Routes = [
{ path: '', component: QuestionListComponent, pathMatch: 'full' }, 
{ path: 'signin', component: SigninScreenComponent },
{ path: 'signup', component: SignupScreenComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
