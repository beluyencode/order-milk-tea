import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { count } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  subscribe: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.subscribe = new BehaviorSubject<any>(this.getCartItems());
  }

  loadService() {
    return this.subscribe.asObservable();
  }

  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  setCartItems(items: any[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
    this.subscribe.next(items);
  }

  order() {
    return this.http.post(environment.host + '/api/order', this.getCartItems());
  }

  arraysEqual(arr1: any[], arr2: any[]) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val) => arr2.includes(val));
  }

  addToCart(item: any): void {
    const cart = this.getCartItems();
    const exitingItem = cart.find(i => i.id === item.id);
    if (exitingItem) {
      if (this.arraysEqual(exitingItem.toppings, item.toppings)) {
        exitingItem.count += 1;
      } else {
        cart.push({
          ...item,
          count: item.count || 1
        });
      }
    } else {
      cart.push({
        ...item,
        count: item.count || 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.subscribe.next(cart);
  }

}
