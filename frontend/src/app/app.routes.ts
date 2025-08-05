// This file defines the routes (the URL paths and what components they load) if you're using standalone routing setup

import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz/:category/:length', component: QuizComponent },
  // { path: '**', component: PageNotFoundComponent }
];
