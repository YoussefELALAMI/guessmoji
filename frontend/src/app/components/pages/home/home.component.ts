import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { ApiService } from '../../../services/api.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ReactiveFormsModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  // Injecting the ApiService
  private apiService = inject(ApiService);
  private router: Router = inject(Router);

  // Properties for the component
  categories: String[] = [];
  other: boolean = false;
  isLoading: boolean = false;
  quizParamsForm = new FormGroup({
    category: new FormControl(''),
    customCategory: new FormControl('', [Validators.pattern('[a-zA-Z ]*')]),
    difficulty: new FormControl('', [Validators.required]),
    numberOfQuestions: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(15)])
  });

  ngOnInit(): void {
    // Any initialization logic can go here
    this.categories = ['Food', 'Movies', 'Songs', 'Actors', 'Countries', 'History', 'F1 Drivers'];
  }

  startQuiz() {
    if (this.quizParamsForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.isLoading = true; // Show loading overlay
    const params = this.quizParamsForm.value;
    console.log('Starting quiz with params:', params);
    this.apiService.startQuiz(params).subscribe({
      next: (data) => {
        console.log('Quiz started successfully:', data);
        this.handleQuizStartSuccess(data);
      },
      error: (error) => {
        console.error('Error starting quiz:', error);
        this.handleQuizStartError(error);
      }
    });
  }


  private handleQuizStartSuccess(data: any) {
    this.isLoading = false;
    this.quizParamsForm.reset();
    this.other = false;
    this.router.navigate(['/quiz', data.category, data.length]);
  }

  private handleQuizStartError(error: any) {
    this.isLoading = false;
    const errorMessage = error.error?.message || 'Failed to start quiz. Please try again.';
    alert(errorMessage);
  }
}