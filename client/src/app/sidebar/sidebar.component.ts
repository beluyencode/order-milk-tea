import { Component, OnInit } from '@angular/core';
import { SiderbarService } from './siderbar.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryMenuService } from '../category-menu/category-menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];
  constructor(private sidebarService: SiderbarService,
    private categoryService: CategoryMenuService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sidebarService.getData();

    this.sidebarService.loadService().subscribe(data => {
      if (data.length && !this.categories.length) {
        this.categories = data;

        const currentId = this.route.snapshot.firstChild?.paramMap.get('id');

        // Nếu đang ở route category với id hợp lệ
        if (currentId) {
          const matched = data.find(c => c.id == currentId);
          if (matched) {
            this.categoryService.setData(matched);
          }
        } else {
          // Nếu không có id trong route → navigate sang phần tử đầu tiên
          this.categoryService.setData(data[0]);
          this.router.navigate(['/category', data[0].id]);
        }

        console.log('Categories loaded:', this.categories);
      }
    });
  }

  selectCategory(category: any): void {
    this.categoryService.setData(category);
  }
}
