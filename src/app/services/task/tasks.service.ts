import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskRequest } from '../../models/taskModels/TaskRequest';
import { environment } from '../../../environments/environment.development';
import { AccountService } from '../account.service';
import { LogedUser } from '../../models/LoginResponse';
import { TaskRessponse } from '../../models/taskModels/TaskResponse';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient, private accountService:AccountService) { }

  getToken(){
    const key = localStorage.getItem(environment.userKey)
    var token = "";
    if(key){
      const user:LogedUser = JSON.parse(key);
      token = (user.tokenInfo.accessToken == undefined) ? '' : user.tokenInfo.accessToken;
    }
    return token;
  }
  getTasks(datos: TaskRequest) {
    var token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    });

    return this.http.post<TaskRessponse>(`${environment.appUrl}/api/Tasks/userDuties`, datos, { headers });
  }

  setTask(datos: TaskRessponse) {
    var token = this.getToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    });

    // Realiza la solicitud HTTP POST con los encabezados personalizados
    return this.http.post<TaskRessponse>(`${environment.appUrl}/api/Tasks/createDuty`, datos, { headers });
  }
  updateTask(datos: TaskRequest) {
    const key = localStorage.getItem(environment.userKey)
    var token = "";
    if(key){
      const user:LogedUser = JSON.parse(key);
      token = (user.tokenInfo.accessToken == undefined) ? '' : user.tokenInfo.accessToken;
    }
    // Define los encabezados personalizados
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    });

    // Realiza la solicitud HTTP POST con los encabezados personalizados
    return this.http.post<TaskRessponse>(`${environment.appUrl}/api/Tasks/userDuties`, datos, { headers });
  }
  deleteTask(datos: TaskRequest) {
    const key = localStorage.getItem(environment.userKey)
    var token = "";
    if(key){
      const user:LogedUser = JSON.parse(key);
      token = (user.tokenInfo.accessToken == undefined) ? '' : user.tokenInfo.accessToken;
    }
    // Define los encabezados personalizados
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    });

    // Realiza la solicitud HTTP POST con los encabezados personalizados
    return this.http.post<TaskRessponse>(`${environment.appUrl}/api/Tasks/userDuties`, datos, { headers });
  }

}
