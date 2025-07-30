import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Question, QuizData } from './quiz.services';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // GET request to fetch all categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  // GET request to obtain the id
  getCategoryId(category: string): Observable<number> {
    return this.http.get<{id: number}>(`${this.apiUrl}/categories/${category}`).pipe(
      map(response => response.id)
    );
  }

  // GET request to fetch quiz data by category and length
  getQuizByCategory(categoryId: number, length: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/quiz/${categoryId}/${length}`);
  }

  // POST request to start a quiz with given parameters
  startQuiz(params: any): Observable<QuizData> {
    return this.http.post<QuizData>(`${this.apiUrl}/start-quiz`, params);
  }

}
