import { Component, OnInit } from '@angular/core';
import { CategoryMenuService } from './category-menu.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { FormsModule } from '@angular/forms';
import { count } from 'rxjs';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss'
})
export class CategoryMenuComponent implements OnInit {
  data: any;
  category: any;
  selectDrink: any;
  constructor(private categoryMenuService: CategoryMenuService, private cartService: CartService) { }

  ngOnInit() {
    this.categoryMenuService.loadService().subscribe(data => {
      if (data) {
        this.category = data;
        this.categoryMenuService.getItemData(this.category.id);
      }
    });
    this.categoryMenuService.loadItemService().subscribe(item => {
      if (item) {
        this.data = item;
      }
    });
  }

  openPopup(item: any) {
    this.selectDrink = {
      ...item,
      toppings: item.toppings.map((topping: any) => {
        return {
          name: topping,
          selected: false
        };
      }),
    };
  }

  addToCart(item: any) {
    const drink = {
      ...item,
      toppings: item.toppings.filter((topping: any) => topping.selected).map((topping: any) => topping.name)
    }
    this.cartService.addToCart(drink);
    this.selectDrink = null; // Close popup after adding to cart
  }
}
