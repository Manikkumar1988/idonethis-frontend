import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
