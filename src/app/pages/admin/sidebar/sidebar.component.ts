import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  constructor(private _login:LoginService){}

  public logout()
  {
    // this.isLoggedIn = false;
    // this.user = null;
    this._login.logout();
    window.location.reload(); 
    // this.login.loginStatusSubject.next(false);
  }
}
