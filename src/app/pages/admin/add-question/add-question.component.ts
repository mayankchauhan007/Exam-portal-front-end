import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public editor = ClassicEditor;
  qid:any;
  qtitle : any;
  question = {
    quiz:{
      qid:'',
    },
    content :'',
    option1 :'',
    option2 :'',
    option3 :'',
    option4 :'',
    answer :'',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question : QuestionService,
  ) {}
  
  
  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qtitle = this._route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qid;
  }

  formSubmit() {
   
    if(this.question.content.trim() == '' || this.question.content.trim() == null ){
      Swal.fire("Error !!",'Enter Content','error');
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1.trim() == null ){
      Swal.fire("Error !!",'Enter Option1','error');
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2.trim() == null ){
      Swal.fire("Error !!",'Enter option2','error');
      return;
    }
    if(this.question.option3.trim() == '' || this.question.option3.trim() == null ){
      Swal.fire("Error !!",'Enter Option3','error');
      return;
    }
    if(this.question.option4.trim() == '' || this.question.option4.trim() == null ){
      Swal.fire("Error !!",'Enter Option4','error');
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer.trim() == null ){
      Swal.fire("Error !!",'Select Answer','error');
      return;
    }

    this._question.addQuestionsOfQuiz(this.question).subscribe((data:any)=>
    {
      Swal.fire("Success !!", "Question Added", 'success');
      this.question = data;
      this.question.content = '';
      this.question.option1 ='';
      this.question.option2 ='';
      this.question.option3 ='';
      this.question.option4 ='';
      this.question.answer ='';
      console.log(this.question);
    },
    (error)=>{
      Swal.fire("Error !!", "error in adding question", 'error');
      console.log(error);
    }
    );

  }


}
