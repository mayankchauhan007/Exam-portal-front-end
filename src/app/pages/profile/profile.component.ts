import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private login: LoginService) {}
  user: any;

  ngOnInit(): void {
    this.user = this.login.getUser();
  }
}
