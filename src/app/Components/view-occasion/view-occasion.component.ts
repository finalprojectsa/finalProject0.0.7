import { Component, OnInit } from '@angular/core';
import { Occasion } from 'src/app/Classes/occasion';
import { DataService } from 'src/app/Services/data.service';
import { OccasionService } from '../../Services/occasion.service'
import { OccasionTypeService } from '../../Services/occasion-type.service';

@Component({
  selector: 'app-view-occasion',
  templateUrl: './view-occasion.component.html',
  styleUrls: ['./view-occasion.component.css']
})
export class ViewOccasionComponent implements OnInit {

  constructor(private dataSer: DataService,
              private occasionSer: OccasionService,
              private occsionTypeSer:OccasionTypeService) { }
  //הגדרת מערך לשמירת הארועים למשתמש נוכחי
  occasionList: Array<Occasion> = null;

  ngOnInit(): void {
    //קבלת רשימת הארועים  ע"פ בן אדם מהשרת
    if (this.dataSer.currentUser == null)
      this.dataSer.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (this.occasionList == null) {
      this.occasionSer.GetOccasionByInviterCode(this.dataSer.currentUser.personCode).subscribe(
        data => { this.occasionList = data },
        err => {
          console.log(err.message);
        }
      )
    }
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
  }

}
