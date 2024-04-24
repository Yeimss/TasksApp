import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public accountService:AccountService){}
  public username!: string;

  obtenerNombreUsuario(){
    const email = this.accountService.getEmail();
    const indiceArroba: number = email.indexOf('@');
    if (indiceArroba !== -1) {
        return email.substring(0, indiceArroba);
    } else {
        return email;
    }
  }

  logout(){
    this.accountService.logout();
  }
}
