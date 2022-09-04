import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Occasion } from '../Classes/occasion';

@Injectable({
  providedIn: 'root'
})

export class OccasionService {

  constructor(private httpApi:HttpClient) { }
  URL: string = "https://localhost:44301/api/Occasion/";

  public GetOccasionByInviterCode(inviterCode:number):Observable<Array<Occasion>> {

    return this.httpApi.get<Array<Occasion>>(this.URL+"GetOccasionByInviterCode/"+ inviterCode);

  }
  //פונקציה להוספת ארוע 
  public AddOccasion(newOcc:Occasion):Observable<Array<Occasion>> {

    debugger;
    return this.httpApi.post<Array<Occasion>>(this.URL+"AddOccasion/",newOcc); 
    
  }
}
