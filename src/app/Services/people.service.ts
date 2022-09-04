import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Person } from '../Classes/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpApi: HttpClient) { }

  URL: string = "https://localhost:44301/api/People/";

  //פונקציה להחזרת אדם ע"פ מספר טלפון
  public GetPersonByPhone(phone:string):Observable<Person> {

    return this.httpApi.get<Person>(this.URL+"GetPersonByPhone/"+ phone);

  }
  //פונקציה להוספת בן אדם
  public AddPerson(newPer:Person):Observable<Array<Person>> {
debugger
    return this.httpApi.post<Array<Person>>(this.URL+"AddPerson/",newPer); 
    
  }
//פונקציה לקבלת רשימת הקידומות
public GetDistinctAreaCode():Observable<Array<string>> {

  return this.httpApi.get<Array<string>>(this.URL+"GetDistinctAreaCode/"); 
  
}
////////////////////////////////
//פונקציה לקבלת רשימת האנשים
public GetAllPeople():Observable<Array<Person>> {

  return this.httpApi.get<Array<Person>>(this.URL+"GetAllPeople/"); 
 
}

//פונקציה לקבלת אורך רשימת האנשים
public GetHighestCode():Observable<number> {

  return this.httpApi.get<number>(this.URL+"GetHighestCode/"); 
 
}

//פונקציה לקבלת רשימת ערים
public GetDistinctCity():Observable<Array<string>>{

  return this.httpApi.get<Array<string>>(this.URL+"GetDistinctCity/"); 
 
}
//פונקציה לקבלת רשימת מקומות לימוד
public GetDistinctStudyPlace():Observable<Array<string>>{

  return this.httpApi.get<Array<string>>(this.URL+"GetDistinctStudyPlace/"); 
 
}

//פונקציה לקבלת רשימת מקומות תפילה
public GetDistinctDavenPlace():Observable<Array<string>>{

  return this.httpApi.get<Array<string>>(this.URL+"GetDistinctDavenPlace/"); 
 
}
}
