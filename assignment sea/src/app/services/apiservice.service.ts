import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contactInfo } from '../components/datacard/data-card/data-card.model';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  public Datastore: any = []


  constructor(private http: HttpClient) { }

  AddData(data: any) {
    return this.http.post<contactInfo[]>('http://localhost:3000/posts', data)
  }

  GetData(): Observable<contactInfo[]> {
    return this.http.get<contactInfo[]>('http://localhost:3000/posts')
  }

  deleteData(id: any) {
    return this.http.delete('http://localhost:3000/posts/' + `${id}`)
  }

  updateData(id: any, data: any): Observable<contactInfo[]> {
    return this.http.put<contactInfo[]>('http://localhost:3000/posts/' + `${id}`, data)
  }

  saveData(data: any) {
    this.Datastore = data
  }
}