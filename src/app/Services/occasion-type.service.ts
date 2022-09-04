import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OccasionTypes } from '../Classes/occasion-types'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OccasionTypeService {

  constructor(private httpAPI:HttpClient) { }
  URL: string = "https://localhost:44301/api/OccasionTypes/";

  public GetAllOccasionType():Observable<Array<OccasionTypes>> {

    return this.httpAPI.get<Array<OccasionTypes>>(this.URL+"GetAllOccasionType/");

  }
  public GetOccasionTypeCodeByOccasionName(occasionName:string):Observable<OccasionTypes> {

    return this.httpAPI.get<OccasionTypes>(this.URL+"GetOccasionTypeCodeByOccasionName/"+occasionName);

  }
  
}
