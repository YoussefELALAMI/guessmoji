import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  // POST request to start a quiz with given parameters
  startQuiz(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/start-quiz`, params);
  }

}
