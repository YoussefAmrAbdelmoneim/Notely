import { baseUrl } from './../../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient:HttpClient) { }
 
  addNote(data:object):Observable<any>{
    return this.httpClient.post(`${baseUrl.url}/api/v1/notes`,data)
  }
 
  getNotes():Observable<any>{
    return this.httpClient.get(`${baseUrl.url}/api/v1/notes`)
  }
  deleteNote(id:string):Observable<any>{
    return this.httpClient.delete(`${baseUrl.url}/api/v1/notes/${id}`)
  }
  updateNote(data:object,id:string):Observable<any>{
    return this.httpClient.put(`${baseUrl.url}/api/v1/notes/${id}`,data)
  }
}