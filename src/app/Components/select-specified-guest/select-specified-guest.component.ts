import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/Classes/person';
import { DataService } from 'src/app/Services/data.service';
import { PeopleService } from 'src/app/Services/people.service';

@Component({
  selector: 'app-select-specified-guest',
  templateUrl: './select-specified-guest.component.html',
  styleUrls: ['./select-specified-guest.component.css']
})
export class SelectSpecifiedGuestComponent implements OnInit {

  constructor(private peopleSer: PeopleService,
              public dataSer: DataService) { }

  length: number = -1;
  
  public help:Array<Person> = null;

  @Input('list')list:Array<Person>;

  ngOnInit(): void {
    debugger;
    // if (this.dataSer.peopleList == null) {
    //   this.peopleSer.GetAllPeople().subscribe(
    //     data => {
    //       debugger;
    //       this.dataSer.peopleList = data;
    //     },
    //     err => {

    //     }
    //   )
    // }
  }

  select(index:number){
    this.dataSer.selectedList[index] = !this.dataSer.selectedList[index];
  }
}
