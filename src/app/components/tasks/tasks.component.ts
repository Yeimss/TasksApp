import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TaskRequest } from '../../models/taskModels/TaskRequest';
import { TasksService } from '../../services/task/tasks.service';
import { TaskRessponse } from '../../models/taskModels/TaskResponse';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  
  constructor(public accountService:AccountService,
    public taskService:TasksService
  ){ }
  
  public taskRequest: TaskRequest | undefined 
  public taskResponse: any 
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
    let fecha = new Date()
    let tr : TaskRequest = {
      title: "",
      detail: "",
      dueDate: fecha,
      isCompleted: false,
      email : this.accountService.getEmail(),
    }

    this.taskService.getTasks(tr).subscribe({
      next: res=>{
        this.taskResponse=res
      },error:err=>{
        console.log(err)
      }
    })
  }
}
