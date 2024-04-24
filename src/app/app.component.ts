import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { RefreshToken } from './models/Login';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private accountService:AccountService){}
   

  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser(refreshToken:RefreshToken = {}  ) {
    const token = this.accountService.getRefreshToken();
    if(token){
      refreshToken.refreshToken = token;
      this.accountService.refreshUser(refreshToken).subscribe({
        next: response =>{

        },error: error =>{
          this.accountService.logout();
        }
      })
    }
  }



  title = 'TasksApp';
}
