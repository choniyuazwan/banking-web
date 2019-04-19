import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  obj: Object;
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<myData>('/assets/data/records.json')

  }
}
