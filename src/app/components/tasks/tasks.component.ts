import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TaskRequest } from '../../models/taskModels/TaskRequest';
import { TasksService } from '../../services/task/tasks.service';
import { TaskRessponse } from '../../models/taskModels/TaskResponse';

//import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  taskForm:FormGroup = new FormGroup({});
  constructor(public accountService:AccountService,
  public taskService:TasksService, private formBuilder:FormBuilder,
  public router:Router){ }
  
  public taskRequest: TaskRequest | undefined 
  public taskResponse: any 
  public mostrarTabla = false;
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
        this.taskResponse=res;
        this.mostrarTabla =  this.taskResponse.length === 0 ? false : true;
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
    this.taskForm.get('isCompleted')?.setValue(item.isCompleted ? true : false)
    this.taskForm.get('email')?.setValue(item.email)
  }

  resetForm(){
    this.taskForm.reset();
  }
  
  create(){
    this.taskForm.get('email')?.setValue(this.accountService.getEmail())
    if(this.taskForm.valid){
      let datos :TaskRequest = {
        title: this.taskForm.get('title')?.value,
        detail: this.taskForm.get('detail')?.value,
        dueDate: this.taskForm.get('dueDate')?.value,
        isCompleted: (this.taskForm.get('isCompleted')?.value == null) ? false : this.taskForm.get('isCompleted')?.value,
        email: this.taskForm.get('email')?.value,
      }
      this.taskService.setTask(datos).subscribe({
        next:(response) =>{
          Swal.fire("Tarea guardada", "", "success");
          this.router.navigateByUrl('/');
        },error: error => {
          Swal.fire("No se pudo guardar la tarea", "", "info");
          console.log(error);
        }
      })
    }
  }

  update(){
    this.taskForm.get('email')?.setValue(this.accountService.getEmail())
    if(this.taskForm.valid){
      this.taskService.updateTask(this.taskForm.value).subscribe({
        next:(response) =>{
          Swal.fire("Tarea actualizada", "", "success");
          this.router.navigateByUrl('/');
        },error: error => {
          Swal.fire("No se pudo actualizar la tarea", "", "info");
          console.log(error);
        }
      })
    }
  }


  eliminar(item:TaskRessponse){
    this.taskService.deleteTask(item.id).subscribe({
      next:(response) =>{
        Swal.fire("Tarea eliminada exitosamente", "", "success");
        this.router.navigateByUrl('/');
      },error: error => {
        console.log(error);
      }
    })
    
  }

  confirmarEliminar(item:TaskRessponse){
    Swal.fire({
      title: "¿Seguro que quiere eliminar la tarea?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {
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
      detail: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      isCompleted: ['', []],
      email: ['',[]]
    })
  }
}
