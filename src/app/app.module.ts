import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { PolicyComponent } from './policy/policy.component';
import { AppRoutingModule } from './app-routing.module';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EmailHRComponent } from './email-hr/email-hr.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { EditPolicyDialogComponent } from './edit-policy-dialog/edit-policy-dialog.component';
import { Globals } from './globals';
import { SelectDepartmentsComponent } from './select-departments/select-departments.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    ViewSurveyComponent,
    PolicyComponent,
    UserSettingsComponent,
    AlertsComponent,
    EmailHRComponent,
    ErrorDialogComponent,
    EditPolicyDialogComponent,
    SelectDepartmentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule
  ],
  exports: [ErrorDialogComponent, EditPolicyDialogComponent],
  entryComponents: [ErrorDialogComponent, EditPolicyDialogComponent],
  providers: [ Globals ],
  bootstrap: [AppComponent]
})
export class AppModule { }
