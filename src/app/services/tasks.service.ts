import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
private readonly webHockUrl= environment.webHockUrl;
  constructor(private readonly http: HttpClient) {}
  //el HttpClient debe ser importado en app

  getTaskList(start: number, filter: any){
    let body = filter;
    return this.http.post(`${this.webHockUrl}/tasks.task.list?start=${start}`, body);
  }

  //Metodo para traer los usuarios de bitrix24 fadesa
  getUserList(start:number){
    return this.http.get(`${this.webHockUrl}/user.get?start=${start}`);
  }
}
