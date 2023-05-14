import { Component , OnInit} from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private _quiz : QuizService){

  }

  quizzes:any

    ngOnInit(): void 
    {
      this._quiz.quizzes().subscribe((data:any)=>
      {
        this.quizzes = data;
        console.log(this.quizzes);
      },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "error in loading data", 'error');
    })
  }

  deleteQuiz(qid:any){
   Swal.fire({
    icon:'warning',
    'title': "Are you sure about that ?",
    confirmButtonText: 'Delete',
    showCancelButton:true,
   }).then((result)=>
   {
    if(result.isConfirmed){
        console.log("delete quiz works");
        this._quiz.deleteQuiz(qid).subscribe((data:any)=>
        {
          this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qid !=qid);
          Swal.fire("Success !!", "Quiz deleted successfully", 'success');
        },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!", "error in loading data", 'error');
      })
    }
   })

  }

}
