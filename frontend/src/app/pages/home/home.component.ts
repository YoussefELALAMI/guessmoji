import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../services/api.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  // Injecting the ApiService
  private apiService = inject(ApiService);

  // Properties for the component
  categories: any[] = [];
  other: boolean = false;
  quizParamsForm = new FormGroup({
    category: new FormControl(''),
    customCategory: new FormControl(''),
    difficulty: new FormControl(''),
    numberOfQuestions: new FormControl(5)
  });

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

  startQuiz() {
    const params = this.quizParamsForm.value;
    console.log('Starting quiz with params:', params);
  }
}