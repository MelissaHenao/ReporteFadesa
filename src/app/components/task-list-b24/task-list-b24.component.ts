import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'task-list-b24',
  templateUrl: './task-list-b24.component.html',
  styleUrls: ['./task-list-b24.component.scss']
})
export class TaskListB24Component implements OnInit {

  userId: string = "41";
  usersFadesa: any[] = [];
  tareasFadesa: any[] = [];
  tasksForUser: any[] = [];
  tasksFilter: any[] = [];
  idInterval: number | undefined;

  constructor(
    //variable que me hereda las propiedades del servicio (taskB24)
    private readonly tasksB24: TasksService
  ) { }

  ngOnInit(): void {
    //aca es para utilizar los metodos 
    // this.getTasksForUser(this.userId);
    this.getUser();
  }

  getUser() {
    this.tasksB24.getUserList(0).subscribe({
      'next': (userList: any) => {
        let start = 50;
        let totalUsers = userList.total;
        this.usersFadesa = userList.result;

        while (start < totalUsers) {
          this.tasksB24.getUserList(start).subscribe({
            'next': (nextUsers: any) => {
              nextUsers.result.forEach((user:any) => {
                this.usersFadesa.push(user);
              });
            },
            'error': error => console.log(error)
          })
          start += 50;
        }
        console.log("Usuarios fadesa:", this.usersFadesa);
        let count = 0;
        this.idInterval = window.setInterval(() => {
          console.log("userID:", this.usersFadesa[count].ID);
          this.getTasksForUser(this.usersFadesa[count].ID);
          count++;
          console.log("Contador:", count);
          if (count >= totalUsers) {
            setTimeout(() => {
              this.tasksFilterFadesa();
            }, 1000);
            clearInterval(this.idInterval);
          }
        }, 1000);
        console.log("Tareas por usuario:", this.tasksForUser);
      },
      'error': error => console.log(error)
    })
  }

  getTasksForUser(userId: number) {
    let filter = {
      filter: {
        RESPONSIBLE_ID: userId
      }
    }
    this.tasksB24.getTaskList(0, filter).subscribe({
      //taskList= me va recibir lo que traiga el metodo getTaskList que va a venir de service
      // next es la respuesta positiva de la peticion que se acaba de ejecutar 
      'next': (taskList: any) => {
        let start = 50;
        let totalTareas = taskList.total;
        let tasksFadesa = [];
        tasksFadesa = taskList.result.tasks;
        
        while (start < totalTareas) {
          this.tasksB24.getTaskList(start, filter).subscribe({
            'next': (nextTasks: any) => {
              nextTasks.result.tasks.forEach((tasks: any) => {
                tasksFadesa.push(tasks);
              })
            },
            'error': error => console.log(error)
          })
          start += 50;
        }
        this.tasksForUser.push(tasksFadesa);
      },
      'error': error => console.log(error)
    })
  }

  tasksFilterFadesa() {
    console.log("Total tareas:", this.tasksForUser.length);
    this.tasksForUser.forEach(task => {
      const taskFilter = task.filter((taskFadesa: any) => taskFadesa.status === "3" || taskFadesa.status === "5" || taskFadesa.subStatus === "-1");
      if (taskFilter.length > 0) {
        this.tasksFilter.push(taskFilter);
      }
    })
    console.log("Tareas filtradas:", this.tasksFilter);
  }

}
