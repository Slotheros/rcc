import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from  './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EmailHRComponent } from './email-hr/email-hr.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-settings', component: UserSettingsComponent },
  { path: 'alerts', component: AlertsComponent},
  { path: 'email-hr', component: EmailHRComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}