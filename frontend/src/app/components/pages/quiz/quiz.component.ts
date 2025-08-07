import { Component, inject, Output } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { ApiService } from '../../../services/api.service';
import { QuizData } from '../../../services/quiz.services';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map, Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";
import { ResultComponent } from "../result/result.component";

@Component({
  selector: 'app-quiz',
  imports: [HeaderComponent, ReactiveFormsModule, FooterComponent, ResultComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  private destroy$ = new Subject<void>();
  private apiService = inject(ApiService);

  questionForm: FormGroup = new FormGroup({
    answer: new FormControl('', Validators.required)
  });
  quizData: QuizData | null = null;
  progressPercentage: number = 0;
  currentQuestionIndex: number = 0;
  isCorrect: boolean = false;
  isIncorrect: boolean = false;
  isSubmitted: boolean = false;
  isQuizCompleted: boolean = false;
  score: number = 0;
  length: number = 0;

  constructor(private route: ActivatedRoute) {
    const lengthParam = this.route.snapshot.paramMap.get('length');
    console.log(`Received length parameter: ${lengthParam}`);
    this.length = lengthParam !== null ? Number(lengthParam) : 0;

    this.route.params.pipe(
      switchMap(params => {
        const category = params['category'];
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
      },
      error: (error) => {
        console.error('Error loading quiz data:', error);
        alert('Failed to load quiz data. Please try again.');
      }
    });
  }

  submitAnswer() {
    this.isSubmitted = true;
    const answer = this.questionForm.value.answer;
    const currentQuestion = this.quizData?.questions[this.currentQuestionIndex];
    if (answer.toLowerCase() === currentQuestion?.answer.toLowerCase()) {
      this.isCorrect = true;
      this.isIncorrect = false;
      this.score++;
    } else {
      this.isCorrect = false;
      this.isIncorrect = true;
    }
  }

  nextQuestion() {
    this.isSubmitted = false;
    this.isCorrect = false;
    this.isIncorrect = false;
    this.questionForm.reset();

    if (this.currentQuestionIndex < this.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.isQuizCompleted = true;
      this.progressPercentage = 100;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to trigger unsubscription
    this.destroy$.complete(); // Complete the subject
  }

}
