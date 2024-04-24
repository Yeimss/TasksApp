import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FullUser, TaskRequest } from '../../models/taskModels/TaskRequest';
import { TasksService } from '../../services/task/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  
  constructor(public accountService:AccountService,
    public taskService:TasksService
  ){}
  public taskRequest: TaskRequest | undefined 

  ngOnInit(): void {
    this.getTasks()
  }
  get obtenerNombreUsuario() : string{
    const email = this.accountService.getEmail();
    const indiceArroba: number = email.indexOf('@');
    if (indiceArroba !== -1) {
        return email.substring(0, indiceArroba);
    } else {
        return email;
    }
  }

  getTasks(){
    let us : FullUser = {
      email : this.accountService.getEmail(),
    }
    let tr : TaskRequest = {
      user : us
    }
    this.taskService.getTasks(tr).subscribe({
      next: res=>{
        console.log(res)
      },error:err=>{
        console.log(err)
      }
    })
  }
}
