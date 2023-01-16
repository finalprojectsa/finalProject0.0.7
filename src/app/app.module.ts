import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/ourlogin/login.component';
import { LoginComponent2} from './Components/login/login.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AddPersonComponent } from './Components/add-person/add-person.component';
import { OrderOccasionComponent } from './Components/order-occasion/order-occasion.component';
import { ViewOccasionComponent } from './Components/view-occasion/view-occasion.component';
import { SelectGuestComponent } from './Components/select-guest/select-guest.component';
import { routingModule } from './routing.module'
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { RecordDetailsComponent } from './Components/record-details/record-details.component';
import { SelectSpecifiedGuestComponent } from './Components/select-specified-guest/select-specified-guest.component'
import {AuthComponent}from'./Components/auth/auth.component'
import { AuthNavbarComponent } from "./Components/auth-navbar/auth-navbar.component";
import {RegisterComponent} from "./Components/register/register.component"
import { NbInputModule, NbSearchService, NbSearchModule, NbLayoutModule, NbCardModule, NbSidebarModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import * as cdk from 'aws-cdk-lib';
import { NbThemeModule } from '@nebular/theme';
import{PageNotFoundComponent}from './Components/pageNotFound/pageNotFound';
import {A11yModule} from '@angular/cdk/a11y'
import {PlatformModule} from '@angular/cdk/platform'
//import {} from '@angular/cdk/table'
//import {PortalModule} from '@angular/cdk/portal'
// import {PortalModule} from '@angular/cdk/portal'
// import {PortalModule} from '@angular/cdk/portal'

// import {PortalModule} from '@angular/cdk/portal'
import {BidiModule} from '@angular/cdk/bidi'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSmartModalModule } from 'ngx-smart-modal';



// import { ThemeModule } from '../../@theme/theme.module';
// import { FormsRoutingModule } from './forms-routing.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { PhoneValidationComponent } from './Components/phone-validation/phone-validation.component';
import { RequiredValidationComponent } from './Components/required-validation/required-validation.component';

import {AddRecordingComponent} from './Components/add-recording/add-recording.component';
import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { CheckboxComponent } from './Components/checkbox/checkbox.component';


@NgModule({
  declarations: [

    RegisterComponent,
    AuthNavbarComponent,
    AuthComponent,
    LoginComponent2,
    AppComponent,
    LoginComponent,
    MenuComponent,
    AddPersonComponent,
    OrderOccasionComponent,
    ViewOccasionComponent,
    SelectGuestComponent,
    RecordDetailsComponent,
    SelectSpecifiedGuestComponent,
    PhoneValidationComponent,
    RequiredValidationComponent,
    AddRecordingComponent,
    CheckboxComponent
    PageNotFoundComponent
  ],
  imports: [
    NgAudioRecorderModule,
    Ng2SmartTableModule,
    BrowserModule,
    ReactiveFormsModule,
    routingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbInputModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NgxSmartModalModule.forRoot(),
    NbSearchModule,
    NbLayoutModule,
    NbCardModule,
    NbSidebarModule,
    FormsModule,
    


  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

