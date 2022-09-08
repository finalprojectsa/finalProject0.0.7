import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { PeopleService } from "src/app/Services/people.service";

@Component({
  selector: "app-login2",
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent2 implements OnInit {
  constructor(public dataSer: DataService,
              private route: Router,
              private peopleSer: PeopleService) {}

  public loginForm2: FormGroup;

  ngOnInit(): void {

    debugger
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
    this.loginForm2 = new FormGroup({
      dialingCode: new FormControl("", [Validators.required]),
     phone: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7)])
    })
  }

  //פונקציה לכניסה למערכת
  submitLoginForm(e) {
    debugger
    e.preventDefault();
    let dataToSave = this.loginForm2.value;
    alert("gggg")
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
