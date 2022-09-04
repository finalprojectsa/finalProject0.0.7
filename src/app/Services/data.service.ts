import { Injectable } from '@angular/core';
import { Person } from '../Classes/person';
import { OccasionTypes } from '../Classes/occasion-types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  // הגדרת משתמש נוכחי שפעיל במערכת
  currentUser: Person = null;
  //רשימת קידומות טלפון-אזורי חיוג
  areaCodeList: Array<string> = null;
  //רשימת אנשים -כל אדם נמצא באינדקס המתאים לקוד שלו
  peopleList: Array<Person> = null;
  //רשימת אנשים בסיסית
  basePeopleList: Array<Person> = null;
  //רשימת עבור ציון האנשים שנבחרו
  selectedList: Array<boolean> = null;
  //
  occsionTypeList:Array<OccasionTypes> = null;
}
