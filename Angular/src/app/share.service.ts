import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  readonly APIUrl="https://localhost:44313/api";
  constructor(private http: HttpClient) { }

  getQuotesList():Observable<any[]>{
    // var Header = new HttpHeaders({'Authorization': localStorage.getItem('token_type') + ' '+ localStorage.getItem('userToken')});
    return this.http.get<any>(this.APIUrl+'/quotes');
  }

  getQuote(val:any){
    return this.http.get(this.APIUrl+'/quotes/'+val);
  }

  addQuotes(val:any){
    // var Header = new HttpHeaders({'Authorization': localStorage.getItem('token_type') + ' '+ localStorage.getItem('userToken')});
    return this.http.post(this.APIUrl+'/quotes',val)
  }

  updateQuotes(id:any,val:any){
    return this.http.put(this.APIUrl+'/quotes/'+id,val)
  }

  deleteQuotes(val:any){
    return this.http.delete(this.APIUrl+'/quotes/'+val)
  }

  getUserLogin(name:any, password: any){
   
    return this.http.get(this.APIUrl+'/users?name='+name+'&password='+password)
  }

  getUserExist(name:any, email: any){
   
    return this.http.get(this.APIUrl+'/users?name='+name+'&email='+email)
  }

  addUser(val:any){
    return this.http.post(this.APIUrl+'/users',val)
  }




}
