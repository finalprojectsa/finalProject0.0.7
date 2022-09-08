import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-required-validation',
  templateUrl: './required-validation.component.html',
  styleUrls: ['./required-validation.component.css']
})
export class RequiredValidationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('value') value : FormControl;
}
