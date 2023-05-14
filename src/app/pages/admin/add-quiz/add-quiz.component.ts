import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

  categories :any

  quizData =
    {
      title : '',
      description : '',
      maxMarks : '',
      numberOfQuestions : '',
      active : true,
      category : {
        cid : '',
      }
    }
  


  constructor(private _category : CategoryService,
     private snack :MatSnackBar,
     private _quiz:QuizService) {}

    ngOnInit(): void 
    {
        this._category.categories().subscribe((data:any)=>
        {
          this.categories = data;
          console.log(this.categories);
        },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!", "error in loading data", 'error');
      })
    }

    addQuiz(){
      if(this.quizData.title.trim() == '' || this.quizData.title == null)
      {
        this.snack.open("Title Required !!",'Ok',{
          duration:3000
        })
        return;
      }
      this._quiz.addQuiz(this.quizData).subscribe(
        (data:any)=>{
          Swal.fire("Success !!",'Quiz added successfully','success');
          this.quizData ={
            title : '',
            description : '',
            maxMarks : '',
            numberOfQuestions : '',
            active : true,
            category : {
              cid : '',
            }
          }
        },
        (error)=>{
          console.log(error);
          Swal.fire("Error !!" , 'Server Error !!', 'error');
        }
      );
    }
}
