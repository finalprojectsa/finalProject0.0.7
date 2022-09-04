import { IfStmt } from '@angular/compiler';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/Classes/person';
import { DataService } from 'src/app/Services/data.service';
import { PeopleService } from 'src/app/Services/people.service';

@Component({
  selector: 'app-select-guest',
  templateUrl: './select-guest.component.html',
  styleUrls: ['./select-guest.component.css']
})
export class SelectGuestComponent implements OnInit {
  constructor(private router: Router,
    private peopleSer: PeopleService,
    public dataSer: DataService,
    // public modalRef: MdbModalRef<SelectGuestComponent>
    ) { }
  //הגדרת משתנה לשמירת הקוד הגבוה ביותר על מנת לדעת את אורך מערך העזר
  length: number = -1;
  //
  currentList: Array<Person> = null;
  jsonObj = {};
  ngOnInit(): void {
    alert("select guest")
    if (this.dataSer.peopleList == null) {
      this.peopleSer.GetAllPeople().subscribe(
        
        data => {
          debugger;
          alert("in")
          this.dataSer.peopleList = data;
          this.jsonObj = this.dataSer.peopleList
         // this.jsonObj = JSON.stringify(this.dataSer.peopleList) ;
          //this.data = this.jsonObj;
          console.log(this.dataSer.peopleList);
          console.log(this.jsonObj);
        },
        err => {

        }
      )
    }
    //אתחול מערך עזר בסרביס 
    if (this.dataSer.selectedList == null) {
      this.peopleSer.GetHighestCode().subscribe(
        data => {
          this.length = data;
          this.dataSer.selectedList = new Array<boolean>(this.length)
          for (let index = 0; index < this.dataSer.selectedList.length; index++) {
            this.dataSer.selectedList[index] = false;
          }
          if (this.dataSer.basePeopleList == null || this.dataSer.peopleList == null) {
            this.peopleSer.GetAllPeople().subscribe(
              data => {
                debugger
                //אתחול מערך אנשים בסרויס 
                this.dataSer.basePeopleList = data;

                //אתחול מערך בסרויס כאשר כל בן אדם יושב באינדקס המתאים לקוד שלו
                this.dataSer.peopleList = new Array<Person>(this.length);
                for (let index = 0; index < data.length; index++) {
                  this.dataSer.peopleList[data[index].personCode] = data[index];
                }
              },
              err => { }
            )
          }

        },
        err => {
        }
      )
    }
    //אתחול מערך ישיבות
    if (this.studyList == null) {
      this.peopleSer.GetDistinctStudyPlace().subscribe(
        data => {
          this.studyList = data
        },
        err => {
          console.log(err.message);
        }
      )

    }
    //אתחול מערך בתי כנסיות
    if (this.davenList == null) {
      this.peopleSer.GetDistinctDavenPlace().subscribe(
        data => {
          this.davenList = data
        },
        err => {
          console.log(err.message);
        }
      )
    }
    //אתחול מערך ערים
    if (this.placesList == null) {
      this.peopleSer.GetDistinctCity().subscribe(
        data => {
          this.placesList = data
        },
        err => {
          console.log(err.message);
        }
      )
    }
  }
  //פונקציה לחזרה לתפריט קודם
  back() {
    this.router.navigate(['/Menu/OrderOccasion/'])
  }
  //פונקציה להצגת כל האנשים
  showAll() {
    this.peopleSer.GetAllPeople().subscribe(
      data => { this.currentList = data },
      err => {
        console.log(err.message);
      }
    )
  }
  //פונקציה להצגת אנשים נבחרים
  showSelected() {
    this.currentList = new Array<Person>();
    for (let index =1; index < this.dataSer.peopleList.length; index++) {
      if(this.dataSer.peopleList[index] != undefined && this.dataSer.peopleList[index] != null)
      if (this.dataSer.selectedList[this.dataSer.peopleList[index].personCode]) {
        this.currentList.push(this.dataSer.peopleList[index]);
      }
    }
  }
  //משתנים בוליאנים כדי לצין האם להציג רשימה נגללת
  placeFlag: boolean = false;
  davenFlag: boolean = false;
  studyFlag: boolean = false;

  //מערכים לשמירת סינון מבוקש ע"פ קטגוריות
  placesList: Array<string> = null;
  davenList: Array<string> = null;
  studyList: Array<string> = null;

  //פונקציה להצגת רשימה נגללת
  viewPlaceOptions() {
    this.placeFlag = true;
  }
  //פונקציה להצגת רשימה מסוננת ע"פ עיר מבוקשת
  showByPlace(value: string) {
    debugger
    this.currentList = this.dataSer.basePeopleList.filter(p => p.city == value);
    this.placeFlag = false;
  }
  //פונקציה להצגת רשימה נגללת
  viewStudyOptions() {
    this.studyFlag = true;
  }
  //פונקציה להצגת רשימה מסוננת ע"פ מקום למודים מבוקש
  showByStudyPlace(value: string) {
    this.currentList = this.dataSer.basePeopleList.filter(p => p.educationPlace == value);
    this.studyFlag = false;
  }
  //פונקציה להצגת רשימה נגללת
  viewDavenOptions() {

    this.davenFlag = true;
  }
  //פונקציה להצגת רשימה מסוננת ע"פ מקום תפילה מבוקש
  showByDavenPlace(value: string) {
    this.currentList = this.dataSer.basePeopleList.filter(p => p.davenPlace == value);
    this.davenFlag = false;
  }

  showByRelative() {
    //מציאת כל הסבות הזקנים ביותר
    this.recorsiaToFindAllGrandFathers(this.dataSer.currentUser.personCode)
    this.currentList = new Array<Person>();
    // recorsiaToFindAllGrandFathers מעבר על כל המערך שהתקבל בפונקציה 
    //findChildren ושליחת כל איבר לפונקציה 
    for (let index = 0; index < this.arrayRoot.length; index++) {
      this.findChildren(this.arrayRoot[index].personCode)
    }
  }
  //מכניסים למערך את כל הסבות שאין להם אבא או שווער
  //הגדרת המערך
  arrayRoot: Array<Person> = new Array<Person>();
  recorsiaToFindAllGrandFathers(code) {
    //במקרה שאין אבא ואין סבא מכניסים מיד למערך הסבות שאין מעליהים דור
    if (this.dataSer.peopleList[code].fatherCode == 1 && this.dataSer.peopleList[code].fatherInLawCode == 1)
        this.arrayRoot.push(this.dataSer.peopleList[code])
    //מי שיש לו אב שולחים את אביו בקריאה רקוקסיבת
    if (this.dataSer.peopleList[code].fatherCode != 1)
        this.recorsiaToFindAllGrandFathers(this.dataSer.peopleList[code].fatherCode)
    //מי שיש לו שווער שולחים את השווער שלו בקריאה רקוקסיבת
    if (this.dataSer.peopleList[code].fatherInLawCode != 1)
        this.recorsiaToFindAllGrandFathers(this.dataSer.peopleList[code].fatherInLawCode)
  }
  //מציאת כל הצאצאים עבור כל אדם שנשלח לפונקציה
  findChildren(personCode){
    //if((this.dataSer.peopleList[personCode].telephone != '000000000') && ( this.dataSer.peopleList[personCode].cellephone != '000000000'))
        this.currentList.push(this.dataSer.peopleList[personCode])
    for (let index = 1; index < this.dataSer.basePeopleList.length; index++) {
         if(this.dataSer.basePeopleList[index].fatherCode == personCode)
            this.findChildren(this.dataSer.basePeopleList[index].personCode)
         if(this.dataSer.basePeopleList[index].fatherInLawCode == personCode)
            this.findChildren(this.dataSer.basePeopleList[index].personCode)
    }
  }
  //פונקציה לסגירת רשימות נגללות
  closeSelect() {
    this.studyFlag = false;
    this.davenFlag = false;
    this.placeFlag = false;
  }







  // 

  settings = {
    columns: {
      title:{
        title: 'תואר'
      },
      firstName: {
        title: 'שם פרטי'
      },
      suffix:{
        title: 'כינוי'
      },
      lastName: {
        title: 'שם משפחה'
      },
      father: {
        title: 'אב'
      },
      fatherInLaw: {
        title: 'שווער'
      },
      city: {
        title: 'עיר'
      },
      street: {
        title: 'רחוב'
      },
      cellephone: {
        title: 'פלאפון'
      },
      telephone: {
        title: 'טלפון'
      },
      educationPlace: {
        title: 'ישיבה'
      },
      davenPlace: {
        title: 'בית כנסת'
      }
    }
  }
}
