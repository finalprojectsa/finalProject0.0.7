import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Invites} from '../Classes/invites';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitesService {

  constructor(private httpAPI:HttpClient) { }

  URL: string = "https://localhost:44301/api/Invites/";

  //פונקציה להוספה  
  public AddInviteeList(newNvt:Array<Invites>):Observable<Array<Invites>> {
debugger
    return this.httpAPI.post<Array<Invites>>(this.URL+"AddInviteeList/",newNvt); 
    
  }
}
