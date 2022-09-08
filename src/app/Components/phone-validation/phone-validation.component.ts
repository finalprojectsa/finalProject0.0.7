import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-phone-validation',
  templateUrl: './phone-validation.component.html',
  styleUrls: ['./phone-validation.component.css']
})
export class PhoneValidationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

   @Input('phone') phone : FormControl;


}
