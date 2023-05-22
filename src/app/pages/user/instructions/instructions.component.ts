import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid:any;
  quiz:any;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _router:Router,

  ) {}

  ngOnInit(): void 
  {
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe((data:any)=>
    {
      this.quiz = data;
      console.log(this.quiz);
    },
  (error)=>{
    console.log(error);
    Swal.fire("Error !!", "error in loading data", 'error');
  })


  }
  startQuiz(qid:any)
  {
    Swal.fire({
     icon:'warning',
     'title': "Do you want to Start the Quiz ?",
     confirmButtonText: 'Start',
     showCancelButton:true,
    }).then((result)=>
    {
     if(result.isConfirmed){
         this._router.navigate(['/start/' + this.qid])
     }
    })
  }

}
