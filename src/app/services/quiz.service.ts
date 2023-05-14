import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http :HttpClient) { }
  public quizzes(){
    return this.http.get(baseUrl + "/quiz/")
  }

  public addQuiz(quiz:any){
    return this.http.post(baseUrl + "/quiz/", quiz);
  }

  public deleteQuiz(qid:any){
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
  }
}
