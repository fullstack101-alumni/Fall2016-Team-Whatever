import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent { 
    tasks: Task[];
    static id:Number=0;
    name: string;
    description:string;
    progress:string;
    books:string;
    uid:Number;
    constructor(private taskService:TaskService,private route:Router){
        this.taskService.getTasks()
            .subscribe(tasks => {
                console.log("Tasks received successfully");
                console.log(tasks);
                this.tasks = tasks;
            });
    }
    handleError(error:any):Promise<any>{
        console.error("An error occured",error);
        return Promise.reject(error.message || error);
    }
    get UserId(){
        return this.taskService.getUdata().subscribe(data=>{
            this.uid=+(data[0]['id']);
        })
    }
    addT(event:Event):void{
        event.preventDefault();
        var newTask = {
            name:this.name,
            description:this.description,
            progress:this.progress,
            books:this.books
        }
        this.taskService.addTask(this.name,this.description,this.progress,this.books,this.uid)
            .subscribe(task => {
                this.tasks.push(task);
                console.log("Request Succesful");
                console.log(task);
                this.name= '';
                this.description='',
                this.books=''
            },
            err=>this.handleError(err));
    }
    addT1(event:Event):void{
        event.preventDefault();
        var newTask = {
            name:this.name,
            description:this.description,
            progress:this.progress,
            books:this.books
        }
        this.taskService.addTask1(this.name,this.description,this.progress,this.books,this.uid)
            .subscribe(task => {
                this.tasks.push(task);
                console.log("Request Succesful");
                console.log(task);
                this.name= '';
                this.description='',
                this.books=''
            },
            err=>this.handleError(err));
    }
    goBack(){
        this.route.navigate(['/user',this.uid]);
    }
    deleteT(id:Number):void{
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(data => {
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }

        },
        err=>this.handleError(err));
    }
    
    /*updateStatus(task:Task){
        var _task = {
            _id:task._id,
            title: task.title,
            isDone: !task.isDone
        };
        
        this.taskService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }*/
}
