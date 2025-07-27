import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../services/api.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
  categories: String[] = [];
  other: boolean = false;
  quizParamsForm = new FormGroup({
    category: new FormControl('', [Validators.pattern('[a-zA-Z ]*')]),
    customCategory: new FormControl('', [Validators.pattern('[a-zA-Z ]*')]),
    difficulty: new FormControl('', [Validators.required]),
    numberOfQuestions: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(15)])
  });

  ngOnInit(): void {
    // Any initialization logic can go here
    this.categories = ['Food', 'Movies', 'Songs', 'Actors', 'Countries', 'History', 'F1 Drivers'];
  }

  startQuiz() {
    const params = this.quizParamsForm.value;
    console.log('Starting quiz with params:', params);
    this.apiService.startQuiz(params).subscribe({
      next: (data) => {
        console.log('Quiz started successfully:', data);
        // Handle successful quiz start, e.g., navigate to quiz page
      },
      error: (error) => {
        console.error('Error starting quiz:', error);
        // Handle error, e.g., show an error message
      }
    });
  }
}