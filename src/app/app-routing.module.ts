import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './app-auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SingleStudentComponent } from './pages/single-student/single-student.component';
import { StudentsListComponent } from './pages/students-list/students-list.component';

const routes: Routes = [
  { path: 'auth', component: LoginComponent} ,
  { path: 'registration', component: RegistrationComponent} ,
  { path: '', component: StudentsListComponent,     canActivate: [AuthGuard]} ,
  { path:'single-student', component: SingleStudentComponent,     canActivate: [AuthGuard]},
  { path: '', redirectTo: 'students-list', pathMatch: 'full',     canActivate: [AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
