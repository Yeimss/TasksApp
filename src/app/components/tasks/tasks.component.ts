import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TaskRequest } from '../../models/taskModels/TaskRequest';
import { TasksService } from '../../services/task/tasks.service';
import { TaskRessponse } from '../../models/taskModels/TaskResponse';

//import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  taskForm:FormGroup = new FormGroup({});
  constructor(public accountService:AccountService,
    public taskService:TasksService, private formBuilder:FormBuilder ){ }
  
  public taskRequest: TaskRequest | undefined 
  public taskResponse: any 
  ngOnInit(): void {
    this.getTasks()
    this.initializeForm()
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
  mapUpdateData(item:TaskRessponse){
    if(item.dueDate !== undefined && item.dueDate !== null){
      let fecha :Date = new Date(item.dueDate);
      const año: number = fecha.getFullYear();
      const mes: number = fecha.getMonth() + 1; // Los meses son indexados desde 0
      const dia: number = fecha.getDate();
      const fechaFormateada: string = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;
      this.taskForm.get('dueDate')?.setValue(fechaFormateada);
    }
    
    this.taskForm.get('id')?.setValue(item.id)
    this.taskForm.get('title')?.setValue(item.title)
    this.taskForm.get('detail')?.setValue(item.detail)
    this.taskForm.get('isComplete')?.setValue(item.isComplete ? true : false)
    this.taskForm.get('email')?.setValue(item.email)
  }

  editar(){

  }

  eliminar(item:TaskRessponse){

  }

  confirmarEliminar(item:TaskRessponse){
    Swal.fire({
      title: "¿Seguro que quiere eliminar la tarea?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminar(item)
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  }
  cerrarModal(){
    Swal.fire("Cambios no guardados", "", "info");
  }
  initializeForm(){
    this.taskForm = this.formBuilder.group({
      id: ['', []],
      title: ['', [Validators.required]],
      detail: ['', [Validators.requiredTrue]],
      dueDate: ['', [Validators.required]],
      isComplete: ['', []],
      email: ['',[]]
    })
  }
}
