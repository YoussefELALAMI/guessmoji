import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../services/api.service';
import { QuizData } from '../../services/quiz.services';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-quiz',
  imports: [HeaderComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  private destroy$ = new Subject<void>();
  private apiService = inject(ApiService);
  
  quizData: QuizData | null = null;
  progressPercentage: number = 0;
  currentQuestionIndex: number = 0;
  answered = false;
  isCorrect = false;
  score = 0;
  length: number;

  constructor(private route: ActivatedRoute) {
    const lengthParam = this.route.snapshot.paramMap.get('length');
    console.log(`Received length parameter: ${lengthParam}`);
    this.length = lengthParam !== null ? Number(lengthParam) : 0;

    this.route.params.pipe(
      switchMap(params => {
        const category = params['category'];
        console.log(`Fetching quiz for category: ${category} with ID: ${params['id']}`);
        return this.apiService.getCategoryId(category).pipe(
          switchMap(id => this.apiService.getQuizByCategory(id, this.length)),
          map(data => ({
            category: category,
            length: this.length,
            questions: data
          } as QuizData))
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.quizData = data;
        this.length = data.questions.length;
        console.log('Quiz data loaded:', this.quizData);
      },
      error: (error) => {
        console.error('Error loading quiz data:', error);
        alert('Failed to load quiz data. Please try again.');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to trigger unsubscription
    this.destroy$.complete(); // Complete the subject
  }

}
