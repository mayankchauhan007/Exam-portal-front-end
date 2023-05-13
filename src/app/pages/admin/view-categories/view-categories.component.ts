import { Component , OnInit} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  constructor(private category:CategoryService){}
  
  
  categories: any;

  ngOnInit(): void {
    this.category.categories().subscribe((data:any)=>
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
