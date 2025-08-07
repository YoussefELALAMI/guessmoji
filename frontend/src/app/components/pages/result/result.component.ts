import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit, OnDestroy {
  @Input() finalScore: number = 0;
  
  router = inject(Router);
  private apiService = inject(ApiService);
  
  animatedScore: number = 0;
  private animationInterval?: number;

  ngOnInit() {
    this.animateScore();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private animateScore() {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = this.finalScore / steps;
    let current = 0;
    let step = 0;

    this.animationInterval = window.setInterval(() => {
      current += increment;
      step++;
      
      if (step >= steps || current >= this.finalScore) {
        this.animatedScore = this.finalScore;
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }
      } else {
        this.animatedScore = Math.floor(current);
      }
    }, duration / steps);
  }

  getScoreRingGradient(): string {
    if (this.finalScore >= 90) {
      return 'conic-gradient(from 0deg, #4facfe 0deg, #00f2fe 360deg)';
    } else if (this.finalScore >= 80) {
      return 'conic-gradient(from 0deg, #43e97b 0deg, #38f9d7 360deg)';
    } else if (this.finalScore >= 70) {
      return 'conic-gradient(from 0deg, #fa709a 0deg, #fee140 360deg)';
    } else if (this.finalScore >= 60) {
      return 'conic-gradient(from 0deg, #ff9a56 0deg, #ffad56 360deg)';
    } else {
      return 'conic-gradient(from 0deg, #ff6b9d 0deg, #c44569 360deg)';
    }
  }

  getFeedbackTitle(): string {
    if (this.finalScore >= 95) return 'Outstanding!';
    if (this.finalScore >= 90) return 'Exceptional!';
    if (this.finalScore >= 85) return 'Excellent!';
    if (this.finalScore >= 80) return 'Great Job!';
    if (this.finalScore >= 75) return 'Well Done!';
    if (this.finalScore >= 70) return 'Good Work!';
    if (this.finalScore >= 60) return 'Good Effort!';
    if (this.finalScore >= 50) return 'Keep Trying!';
    return 'Keep Learning!';
  }

  getFeedbackDescription(): string {
    if (this.finalScore >= 95) {
      return 'Perfect! You\'ve achieved an exceptional score. Your mastery is truly impressive!';
    } else if (this.finalScore >= 90) {
      return 'Outstanding performance! You\'ve demonstrated exceptional knowledge and skills.';
    } else if (this.finalScore >= 80) {
      return 'Excellent work! You\'ve shown great understanding and competence in this subject.';
    } else if (this.finalScore >= 70) {
      return 'Great job! You\'ve demonstrated solid knowledge. Keep up the good work!';
    } else if (this.finalScore >= 60) {
      return 'Good effort! You\'re on the right track. A bit more practice will help you improve.';
    } else if (this.finalScore >= 50) {
      return 'Keep working at it! You\'re making progress. Review the material and try again.';
    } else {
      return 'Don\'t give up! Every expert was once a beginner. Study more and you\'ll improve!';
    }
  }

  getFeedbackClass(): string {
    if (this.finalScore >= 80) return 'excellent';
    if (this.finalScore >= 70) return 'good';
    if (this.finalScore >= 60) return 'average';
    return 'poor';
  }

  getRanking(): string {
    if (this.finalScore >= 95) return 'Top 1%';
    if (this.finalScore >= 90) return 'Top 5%';
    if (this.finalScore >= 85) return 'Top 10%';
    if (this.finalScore >= 80) return 'Top 15%';
    if (this.finalScore >= 75) return 'Top 25%';
    if (this.finalScore >= 70) return 'Top 35%';
    if (this.finalScore >= 60) return 'Top 50%';
    return 'Bottom 50%';
  }

  getGrade(): string {
    if (this.finalScore >= 97) return 'A+';
    if (this.finalScore >= 93) return 'A';
    if (this.finalScore >= 90) return 'A-';
    if (this.finalScore >= 87) return 'B+';
    if (this.finalScore >= 83) return 'B';
    if (this.finalScore >= 80) return 'B-';
    if (this.finalScore >= 77) return 'C+';
    if (this.finalScore >= 73) return 'C';
    if (this.finalScore >= 70) return 'C-';
    if (this.finalScore >= 60) return 'D';
    return 'F';
  }

  resetQuiz() {
    console.log('Resetting quiz and navigating to home');
    this.router.navigate(['/']);
    this.apiService.deleteAllQuizzes().subscribe({
      next: (response) => {
        console.log('All quizzes deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting quizzes:', error);
      }
    });
  }
}