import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { LoginResponse } from '../../models/LoginResponse';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup = new FormGroup({});
  submitted = false;
  errorMessage : string[] = [];
  loginResponse!: LoginResponse;


  constructor(private accountService: AccountService,
  private formBuilder : FormBuilder, private router:Router){}
  ngOnInit(): void {
    this.initializeForm();
  }

  validarFormato(control:any) {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& ."])[A-Za-z\d@$!%*?& .]{8,20}$/.test(control.value)) {
      return { formatoInvalido: true };
    }
    return null;
  }

  initializeForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validarFormato]]
    })
  }

  login(){
    this.submitted = true;

    if(this.loginForm.valid){
      this.accountService.login(this.loginForm.value).subscribe({
        next:(response) =>{
          this.router .navigateByUrl('/');
        },error: error => {
          Swal.fire("No se pudo iniciar sesión", "", "info");
          console.log(error);
        }
      })
    }
  }
}
