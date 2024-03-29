import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
 import { LoginComponent2 } from './Components/login/login.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AddPersonComponent } from './Components/add-person/add-person.component';
import { OrderOccasionComponent } from './Components/order-occasion/order-occasion.component';
import { ViewOccasionComponent } from './Components/view-occasion/view-occasion.component';
import { SelectGuestComponent } from './Components/select-guest/select-guest.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecordDetailsComponent } from './Components/record-details/record-details.component';
import { AuthComponent} from './Components/auth/auth.component';
import { RegisterComponent } from './Components/register/register.component';
import {AddRecordingComponent} from './Components/add-recording/add-recording.component'
import { PageNotFoundComponent } from './Components/pageNotFound/pageNotFound';

const routerTable : Routes = [
    { path: "", redirectTo:"Login", pathMatch:"full"},
    { path:"Login" , component:LoginComponent2 },
    { path:"Menu" , component:MenuComponent,
    children:[
        // { path:"ytfuyfg7" , component:AddPersonComponent,
        // children:[
        //     { path:"tt" , component:LoginComponent2 }
        // ] },
        { path:"AddPerson" , component:AddPersonComponent },
        { path:"OrderOccasion" , component:OrderOccasionComponent,
    children:[
        {path:"SelectGuest",component:SelectGuestComponent},
        {path:"RecordDetails",component:RecordDetailsComponent},
        {path:"AddRecording",component:AddRecordingComponent},

    ] },
        { path:"ViewOccasion" , component:ViewOccasionComponent  },
        { path: '**', component:PageNotFoundComponent},
    ] }
]
@NgModule({

    imports: [
         RouterModule.forRoot(routerTable), CommonModule
    ],
    declarations: []
})
export class routingModule { }
