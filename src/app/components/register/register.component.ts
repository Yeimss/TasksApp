import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({});
  submitted = false;
  errorMessage : string[] = [];


  constructor(private accountService: AccountService,
  private formBuilder : FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validarFormato]]
    })
  }

  validarFormato(control:any) {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& ."])[A-Za-z\d@$!%*?& .]{8,20}$/.test(control.value)) {
      return { formatoInvalido: true };
    }
    return null;
  }
    
  register(){
    this.submitted = true;
    this.errorMessage = [];

    if(this.registerForm.valid){
      this.accountService.register(this.registerForm.value).subscribe({
        next:(response) =>{
        },error: error => {
          console.log(error)
        }
      })
    }
  }

}
