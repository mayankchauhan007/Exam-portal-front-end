import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { __makeTemplateObject } from 'tslib';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  qid:any;
  questions:any;
  marksGot=0;
  correctAnswer =0;
  attempted = 0;
  isSubmitted = false;
  timer:any;
  
  constructor(
    private _locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _router:Router,
  ) {}  
  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();

  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>
    {
      
      console.log(data);
      this.questions= data;
      this.timer = this.questions.length*2*60;
      
      this.startTimer();
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading Quiz Questions",'error');
    });
  }
  preventBackButton()
  {
    history.pushState(null,'',location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      icon:'warning',
      'title': "Do you want to Submit the Quiz ?",
      confirmButtonText: 'Submit',
      showCancelButton:true,
     }).then((result)=>
     {
      if(result.isConfirmed){
          // this._router.navigate(['/start/' + this.qid])
          this._question.evalQuiz(this.questions).subscribe((data:any)=>{
            console.log(data);
            this.marksGot = parseFloat( Number(data.marksGot).toFixed(2));
            this.correctAnswer = data.correctAnswers;
            this.attempted = data.attempted;
            this.isSubmitted = true;
          },
          (error)=>{
            console.log(error);
          })
      }
     })
  }
  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }

    },1000)
  }
  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer%60;
    return `${mm} Min : ${ss} Sec`
  }
  evalQuiz(){
    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      this.isSubmitted = true;
      console.log(data);
      this.marksGot = data.marksGot;
      this.correctAnswer = data.correctAnswers;
      this.attempted = data.attempted;
      
    },
    (error)=>{
      console.log(error);
    })
    // this.isSubmitted = true;
    //       this.questions.forEach((q:any)=>{
    //         if(q.givenAnswer == q.answer){
    //           this.correctAns++;
    //           let singleQuestionMarks = this.questions[0].quiz.maxMarks/this.questions.length;
    //           this.marksGot += singleQuestionMarks;
    //         }
    //         if(q.givenAnswer.trim()!='' || q.givenAnswer.trim()!=null ){
    //           this.attempted++;
    //         }
    //         console.log("correct answers :" + this.correctAns);
    //         console.log("marks got " + this.marksGot)          
    //         console.log("attempted " + this.attempted) 
    //       })
  }
  printPage(){
    window.print();
  }
}
