import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';
import { CategoryMenuService } from '../category-menu/category-menu.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  isOpen: boolean = false;
  totalPrice: number = 0;
  category: any;

  constructor(private cartService: CartService, private categoryService: CategoryMenuService) {
    this.cartService.loadService().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
    this.categoryService.loadService().subscribe((data) => {
      this.category = data;
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return Math.round((total + (item.price * (item.count || 1))) * 100) / 100;
    }, 0);
  }

  order() {
    this.cartService.order().subscribe((res: any) => {
      if (res.success) {
        this.cartItems = [];
        this.calculateTotalPrice();
        this.isOpen = false; // Close cart after order
        this.cartService.setCartItems(this.cartItems);
        this.categoryService.getItemData(this.category.id); // Refresh category items
      } else {
        alert(res.message);
      }
    });
  }

  toggleCart() {
    this.isOpen = !this.isOpen;
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.cartService.setCartItems(this.cartItems);
  }

  addMore(item: any, count: number) {
    count = (item.count || 1) + count > 0 ? item.count + count : 1;
    item.count = (count <= item.inventory.quantity) ? count : item.count;
    this.cartService.setCartItems(this.cartItems);
  }

  removeTopping(item: any, topping: any) {
    item.toppings = item.toppings.filter((t: any) => t !== topping);
    this.cartService.setCartItems(this.cartItems);
  }
}
