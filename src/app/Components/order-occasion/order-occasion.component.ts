import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Occasion } from '../../Classes/occasion';
import { Person } from '../../Classes/person';
import { Invites } from '../../Classes/invites';
import { OccasionTypes } from '../../Classes/occasion-types';
import { DataService } from '../../Services/data.service';
import { OccasionService } from '../../Services/occasion.service';
import { OccasionTypeService } from '../../Services/occasion-type.service';
import { InvitesService } from '../../Services/invites.service';
import { RecordDetailsComponent } from '../record-details/record-details.component'
import { PeopleService } from 'src/app/Services/people.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SelectGuestComponent } from '../select-guest/select-guest.component';
@Component({
  selector: 'app-order-occasion',   
  templateUrl: './order-occasion.component.html',
  styleUrls: ['./order-occasion.component.css']
  
})
export class OrderOccasionComponent implements OnInit {

  constructor(private occsionTypeSer: OccasionTypeService,
    private router: Router,
    public dataSer: DataService,
    private occasionSer: OccasionService,
    private invitesSer:InvitesService,
    private peopleSer:PeopleService,
    public ngxSmartModalService: NgxSmartModalService) { }

    //משתנה שמגדיר האם להציג את קומפוננטת הוספת ההקלטה
    isAddRecording : Boolean
    dataP={};
  // //הגדרת מערך לסוגי הארועים
  // public occsionTypeList: Array<OccasionTypes> = null;

  //הגדרת אוביקט לטופס הזמנת ארוע
  public orderOccasionForm: FormGroup = null;

  ngOnInit(): void {


     alert("order")
      
    this.isAddRecording = false;
  
    //קבלת רשימת סוגי הארועים מהשרת
    if (this.dataSer.occsionTypeList == null) {
      this.occsionTypeSer.GetAllOccasionType().subscribe(
        data => {
          this.dataSer.occsionTypeList = data;
        },
        err => {
          console.log(err.message);
        }
      )
    }

    //orderOccasionForm אתחול האוביקט 
    this.orderOccasionForm = new FormGroup({
      occasionType: new FormControl(""),
      chooseGuest: new FormControl("בחר אורחים לאירוע"),
      insertRecording: new FormControl("הכנס הקלטה"),
      recordDetails: new FormControl("הכנס פרטי הקלטה"),
      firstMessage:new FormControl("",Validators.required),
      repetition:new FormControl("",[Validators.required,Validators.min(1)]),
      range:new FormControl("",[Validators.required,Validators.min(1)]),
      occasionDate:new FormControl("",Validators.required)
    })
  }

  //פונקציה לנווט לבחירת אורחים
  navigateToSelectGuest() {
    //this.router.navigate(['/Menu/OrderOccasion/SelectGuest'])
    this.ngxSmartModalService.create('myModal2', SelectGuestComponent).open()

  }
  //פונקציה לנווט להגדרת פרטי הקלטה

  navigateToRecordDetails() {
    this.router.navigate(['/Menu/OrderOccasion/RecordDetails'])
  }
  //פונקציה להכנסת הקלטה
  insertRecording() {
    //this.router.navigate(['/Menu/OrderOccasion/AddRecording'])
    // alert("הכנס הקלטה")
    this.isAddRecording = true;
  }
  //הגדרת משתנה שישמור את קוד הארוע שניתן באופן אוטומטי בשרת
  //על מנת לעדכן בטבלת מוזמנים
  lastCode: Number
  //סיום הזמנת ארוע
  newOccasion: Occasion = null
  newInvite: Invites = null;
  newInvites: Array<Invites> = new Array<Invites>()
  selectedOccasion: any;
  submitOrderOccasionForm(e) {
    let dataToSave = this.orderOccasionForm.value
    debugger
    alert("אאאאאאאאאא")
    this.newOccasion = new Occasion(0,
      //this.dataSer.currentUser.personCode,
      JSON.parse(sessionStorage.getItem("currentUser")).personCode, 
      dataToSave.occasionDate,
      "",
      dataToSave.repetition,
      dataToSave.firstMessage,
      dataToSave.range,
      Number(this.selectedOccasion)
    )
    this.occasionSer.AddOccasion(this.newOccasion).subscribe(
      data => {
        debugger
        alert("success")
        this.lastCode = data[data.length - 1].occasionCode
        for (let index = 1; index < this.dataSer.selectedList.length; index++) {
          if (this.dataSer.selectedList[index]) {
              this.newInvite = new Invites(0,this.lastCode,0,false,null,0,index)
              this.newInvites.push(this.newInvite)
          }
        }
        //server call to add the invites 
        this.invitesSer.AddInviteeList(this.newInvites).subscribe(
          data=>{
            debugger
              alert("הצלחה")
          },
          err=>{
            debugger
              alert("כשלון")
          }
        );
      },
      err => {
        debugger
        alert("failed")
      }
    )
  }
  recordDetails: any = null;
  //
  updateRecordDetails(e) {

    this.recordDetails = e;
  }


  
 //data = this.jsonObj;

 
//  data = [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz"
//   },
//   // ... other rows here
//   {
//     id: 11,
//     name: "Nicholas DuBuque",
//     username: "Nicholas.Stanton",
//     email: "Rey.Padberg@rosamond.biz"
//   }
// ];

}
 

 