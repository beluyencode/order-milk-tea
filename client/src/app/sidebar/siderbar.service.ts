import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {
  subscribe: BehaviorSubject<any[]>;

  constructor(private http: HttpClient) {
    this.subscribe = new BehaviorSubject<any[]>([]);
  }

  loadService() {
    return this.subscribe.asObservable();
  }

  getData() {
    return this.http.get<any[]>(environment.host + '/api/categories').subscribe(data => {
      this.subscribe.next(data);
    });
  }

}
