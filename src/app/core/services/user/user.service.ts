import { Injectable } from '@angular/core';
import { baseUrl } from './../../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
 
  signUp(data:object):Observable<any>{
    return this.httpClient.post(`${baseUrl.url}/api/v1/users/signUp`,data)
  }
 
  signIn(data:object):Observable<any>{
    return this.httpClient.post(`${baseUrl.url}/api/v1/users/signIn`,data)
  }
}
