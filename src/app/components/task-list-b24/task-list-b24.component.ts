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
  tasksFadesa: any[] = [];
  tasksFilterForUser: any[] = [];
  report: any[] = [];

  constructor(
    //variable que me hereda las propiedades del servicio (taskB24)
    private readonly tasksB24: TasksService
  ) { }

  ngOnInit(): void {
    //aca es para utilizar los metodos
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
              nextUsers.result.forEach((user: any) => {
                this.usersFadesa.push(user);
              });
            },
            'error': error => console.log(error)
          })
          start += 50;
        }
        this.tasksFilterFadesa();
      },
      'error': error => console.log(error)
    })
  }

  getTasksFadesa() {
    this.tasksB24.getTaskList(0).subscribe({
      //taskList= me va recibir lo que traiga el metodo getTaskList que va a venir de service
      // next es la respuesta positiva de la peticion que se acaba de ejecutar 
      'next': (taskList: any) => {
        let start = 50;
        let totalTareas = taskList.total;
        this.tasksFadesa = taskList.result.tasks;

        while (start < totalTareas) {
          this.tasksB24.getTaskList(start).subscribe({
            'next': (nextTasks: any) => {
              nextTasks.result.tasks.forEach((tasks: any) => {
                this.tasksFadesa.push(tasks);
              })
            },
            'error': error => console.log(error)
          })
          start += 50;
        }
      },
      'error': error => console.log(error)
    })
  }

  tasksFilterFadesa() {
    this.getTasksFadesa();
    setTimeout(() => {
      console.log("Usuarios fadesa:", this.usersFadesa);
      console.log("Total tareas:", this.tasksFadesa);
      this.usersFadesa.forEach(user => {
        const tasksFilter = this.tasksFadesa.filter(task => task.responsibleId === user.ID);
        if (tasksFilter.length > 0) {
          this.tasksFilterForUser.push(tasksFilter);
        }
      })
      console.log("Tareas Filtradas Por Usuario:", this.tasksFilterForUser);
      this.generateReport();
    }, 5000);
  }

  generateReport() {
    this.tasksFilterForUser.forEach(tasksUser => {
      const nameUser = tasksUser[0].responsible.name;
      const charge = this.usersFadesa.filter(user => user.ID === tasksUser[0].responsible.id)[0].WORK_POSITION;
      const totalTasks = tasksUser.length;
      const tasksInProgress = tasksUser.filter((task: any) => task.status === "3").length;
      const completedTasks = tasksUser.filter((task: any) => task.status === "5").length;
      const overdueTasks = tasksUser.filter((task: any) => task.subStatus === "-1").length;
      let efficiency = ((totalTasks - overdueTasks) * 100) / totalTasks;
      this.report.push(
        {
          name: nameUser,
          charge: charge,
          totalTasks: totalTasks,
          tasksInProgress: tasksInProgress,
          completedTasks: completedTasks,
          overdueTasks: overdueTasks,
          efficiency: efficiency
        }
      )
    })
    console.log("Reporte:", this.report);
  }

}
