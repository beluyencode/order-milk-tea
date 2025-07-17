import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryMenuService {
  subscribe: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  subscribeItem: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  loadService() {
    return this.subscribe.asObservable();
  }

  loadItemService() {
    return this.subscribeItem.asObservable();
  }

  setData(data: any) {
    this.subscribe.next(data);
  }

  setItemData(data: any) {
    this.subscribeItem.next(data);
  }

  getItemData(id: number) {
    return this.http.get(environment.host + `/api/items/${id}`).subscribe(data => {
      this.setItemData(data);
    });
  }
}
