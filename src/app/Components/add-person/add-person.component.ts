import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/Classes/person';
import { DataService } from 'src/app/Services/data.service';
import { PeopleService } from 'src/app/Services/people.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  constructor(private peopleSer: PeopleService, public dataSer: DataService) { }

  //הגדרת אוביקט לטופס הוספת בן אדם
  public addPersonForm: FormGroup = null;
  //הגדרת בן אדם חדש להוספה למערכת
  newPerson: Person = null;

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
    //קבלת המשתמש הנוכחי
    if (this.dataSer.currentUser == null)
      this.dataSer.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    //יצירת טופס דינאמי להוספת אדם למערכת
    this.addPersonForm = new FormGroup({
      phoneDialingCode: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      cellDialingCode: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      cellphone: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      city: new FormControl(""),
      street: new FormControl(""),
      fatherInlawDialingCode: new FormControl("", [Validators.required]),
      fatherInlawPhone: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      davenPlace: new FormControl(""),
      title: new FormControl(""),
      suffix: new FormControl(""),
      lastName: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      educationPlace: new FormControl(""),
    });
  }

  //הגדרת משתנה שמסמן האם מוסיפים למערכת בן או חתן
  //במקרה של ברירת המחדל true
  //מדובר בבן ,אחרת בחתן
  son: boolean = true;
  //שינוי המשתנה הנ"ל ע"פ בחירת המשתמש
  changeSonFlag(sonFlag) {
    this.son = sonFlag;
  }
  //הגדרת משתנים לשמירת מספר האב והחותן
  FatherInLowCode: number;
  FatherCode: number;
  //פונקציה להוספת בן אדם למערכת
  submitAddPersonForm(e) {
    e.preventDefault();
    debugger
    let dataToSave = this.addPersonForm.value;
    // חפוש משתמש ע"פ מספר טלפון ברשימת האנשים   
    this.peopleSer.GetPersonByPhone(dataToSave.fatherInlawDialingCode + dataToSave.fatherInlawPhone).subscribe(
      data => {
console.log(data);

        debugger
        if (data != null) {

          if (!this.son) {
            this.FatherInLowCode = this.dataSer.currentUser.personCode;
            this.FatherCode = data.personCode;
          }
          else {
            this.FatherInLowCode = data.personCode;
            this.FatherCode = this.dataSer.currentUser.personCode
          }
          this.newPerson = new Person(0,
            dataToSave.lastName,
            dataToSave.firstName,
            dataToSave.city,
            dataToSave.street,
            dataToSave.phoneDialingCode + dataToSave.phone,
            dataToSave.cellDialingCode + dataToSave.cellphone,
            this.FatherCode,
            this.FatherInLowCode,
            dataToSave.educationPlace,
            dataToSave.davenPlace,
            dataToSave.suffix,
            dataToSave.title);
          this.peopleSer.AddPerson(this.newPerson).subscribe(
            data => { alert("הפעולה השלמה בהצלחה") },
            err => { err.message }
          )

        }
        else
          alert(" השווער/האב לא נמצא , ודא כי הקשת נכון");
      },
      err => {
        console.log(err.message);
      }
    );
  }
}
