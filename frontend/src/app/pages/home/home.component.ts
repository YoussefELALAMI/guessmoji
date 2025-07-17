import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private apiService = inject(ApiService);
  categories: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories fetched:', this.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }


  selectCategory(categoryName: string) {
  }

}
