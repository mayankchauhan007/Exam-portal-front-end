import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  

  categories:any;

  constructor(
    private _cat:CategoryService,


  ) {}

  ngOnInit(): void {

    this._cat.categories().subscribe((data:any)=>
    {
      this.categories = data;
      console.log(this.categories);
    },
  (error)=>{
    console.log(error);
    Swal.fire("Error !!", "error in loading data", 'error');
  })
    
  }

}
