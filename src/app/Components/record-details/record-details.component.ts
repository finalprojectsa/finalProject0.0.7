import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.css']
})
export class RecordDetailsComponent implements OnInit {
  
  public recordDetailForm:FormGroup

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.recordDetailForm = new FormGroup({
      firstMessage:new FormControl("",Validators.required),
      repetition:new FormControl("",[Validators.required,Validators.min(1)]),
      range:new FormControl("",[Validators.required,Validators.min(1)]),
      occasionDate:new FormControl("",Validators.required),
    })
  }
  //משתנה השומר את פרטי ההקלטה ובעת סיום מלואם ,מיצא אותם לקומפוננטת האב
  @Output('record-details')recordDetails:EventEmitter<any> = new EventEmitter<any>();
  //פונקציה להגשת פרטי הקלטה
  submitRecordDetailForm(){
    debugger
     let dataToSave  = this.recordDetailForm.value;
     //יצוא הנתונים שמולאו לקומפוננטת האב
     this.recordDetails.emit(dataToSave);
     this.router.navigate(['/Menu/OrderOccasion/'])
  }

  //פונקציה לחזרה לתפריט קודם
  back(){
    this.router.navigate(['/Menu/OrderOccasion/'])
  }
}
