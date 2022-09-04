import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { PeopleService } from '../../Services/people.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dataSer: DataService,
              private route: Router,
              private peopleSer: PeopleService) { }
  

  //הגדרת אוביקט לטופס login
  public loginForm: FormGroup;

  ngOnInit(): void {
    //קבלת רשימת הקידומות-אזורי חיוג
    if (this.dataSer.areaCodeList == null) {
      this.peopleSer.GetDistinctAreaCode().subscribe(
        data => {
          this.dataSer.areaCodeList = data
        },
        err => {
          console.log(err.message);
        }
      )
    }
    //אתחול האוביקט login
    this.loginForm = new FormGroup({
      dialingCode: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7)])
    })

  }
  //פונקציה לכניסה למערכת
  submitLoginForm(e) {
    e.preventDefault();
    let dataToSave = this.loginForm.value;
    // חפוש משתמש ע"פ מספר טלפון ברשימת האנשים   
    this.peopleSer.GetPersonByPhone(dataToSave.dialingCode + dataToSave.phone).subscribe(
      data => {
        if (data != null) {
          this.dataSer.currentUser = data;
          sessionStorage.setItem('currentUser',JSON.stringify(data));
          debugger;
          console.log(JSON.parse(sessionStorage.getItem('currentUser')));
          this.route.navigate(['/Menu']);
        }
        else
          alert("אינך רשום במערכת ,נא ודא כי הקלדת מספר נכון");
      },
      err => {
        console.log(err.message);
      }
    );
  }

}

