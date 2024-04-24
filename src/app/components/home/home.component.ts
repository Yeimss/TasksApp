import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public accountService:AccountService){}

  get obtenerNombreUsuario() : string{
    const email = this.accountService.getEmail();
    const indiceArroba: number = email.indexOf('@');
    if (indiceArroba !== -1) {
        return email.substring(0, indiceArroba);
    } else {
        return email;
    }
  }
}
