import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  cid:any;
  quizzes:any;
  
  
  constructor(
    private route:ActivatedRoute,
    private _quiz : QuizService,
    ) {}


  ngOnInit(): void {
    

    this.route.params.subscribe((params)=>
    {
      this.cid = params['cid'];
      if(this.cid == 'all'){
        console.log("load all the quizzes");
        this._quiz.getActiveQuizzes().subscribe((data:any)=>
        {
          this.quizzes = data;
          console.log(this.quizzes);
        },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!", "error in loading data", 'error');
      })
      }
      else{
        console.log("load single quiz");
        this._quiz.getActiveQuizzesOfCategory(this.cid).subscribe((data:any)=>
        {
          this.quizzes = data;
          console.log(this.quizzes);
        },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!", "error in loading data", 'error');
      })
        
      }
    })


    
  }
}
