import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  constructor(private route:ActivatedRoute, 
    private _quiz:QuizService,
    private _category:CategoryService,
    private snack:MatSnackBar,
    private router:Router) {}


  qid:any
  quiz:any
  categories:any


  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    // alert(this.qid)
    this._quiz.getQuiz(this.qid).subscribe((data:any)=>
    {
      this.quiz = data;
      console.log(this.quiz);
    },
    (error)=>{
      console.log(error);
    }
    );

    this._category.categories().subscribe((data:any)=>
    {
      this.categories = data;
      console.log(this.quiz);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "error in loading data", 'error');
    }
    );
  }

  public updateQuiz(){
    if(this.quiz.title.trim() == '' || this.quiz.title == null)
      {
        this.snack.open("Title Required !!",'Ok',{
          duration:3000
        })
        return;
      }
      this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>
      {
        Swal.fire("Success !!", "Quiz Updated ", 'success').then((e)=>{
          this.router.navigate(['/admin/quizzes'])
        });
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=>{
        Swal.fire("Error !!", "error in updating quiz", 'error');
        console.log(error);
      }
      );

    }
}
