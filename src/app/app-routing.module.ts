import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from  './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ViewSurveyComponent} from './view-survey/view-survey.component';
import {ViewPolicyComponent} from './view-policy/view-policy.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'home', component: HomeComponent },
  { path: 'view-survey', component: ViewSurveyComponent },
  { path: 'view-policy', component: ViewPolicyComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
