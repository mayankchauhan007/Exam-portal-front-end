import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  qid :any;
  qtitle : any;
  questions : any;

  constructor(
    private route :ActivatedRoute,
    private _question : QuestionService,
  ) {};


  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.qtitle = this.route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qid).subscribe((data:any)=>
    {
      this.questions = data;
      console.log(this.questions);
    },
    (error)=>{
      console.log(error);
    }
    );
    
  }

  public deleteQuestion(qid:any){
    Swal.fire({
      icon:'warning',
      'title': "Are you sure about that ?",
      confirmButtonText: 'Delete',
      showCancelButton:true,
     }).then((result)=>
     {
      if(result.isConfirmed)
      {
          console.log("delete quiz works");
          this._question.deleteQuestion(qid).subscribe((data:any)=>
          {
            this.questions = this.questions.filter((q:any)=>q.quesId !=qid);
            Swal.fire("Success !!", "Question deleted successfully", 'success');
          },
        (error)=>{
          console.log(error);
          Swal.fire("Error !!", "error in loading data", 'error');
        });
      }
    });
  }
}
