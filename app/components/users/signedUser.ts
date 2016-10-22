import {Component,OnInit,OnChanges} from '@angular/core';
import {Task} from '../../../Task';
import {User} from '../../../user';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {Http} from '@angular/http';
@Component({
    moduleId:module.id,
    selector:'user-data',
    templateUrl:'signedUser.html'
})

export class UserData implements OnInit{
    tasks:Task[]=[];
    users:User[]=[];
    newTask:Task;
    currentUser:Number;
    constructor(private route:ActivatedRoute,private userv:UserService,private taskServ:TaskService,private http:Http){
    }
     handleError(error:any):Promise<any>{
        console.error("An error occured",error);
        return Promise.reject(error.message || error);
    }
    getUserId(){
        return this.userv.getUserData().subscribe(data=>{
           this.currentUser=+data[0]['id'];
        })
    }
    populateTasks(){
        console.log("populateTasks called");
         this.getUserId();
        console.log("The value of the current user is "+this.currentUser);
        this.userv.getIndividualTasks().subscribe(data=>{
            console.log("Succesful retrieval");
            //console.log('Data is '+data.length+" "+data['error']);
            //console.log("Data is "+data['error']);
            console.log(data);
            data.forEach((el:Object)=>{
                if(el['userid']==this.currentUser){
                    console.log(el);
                this.newTask={
                    _id:el['id'],
                    name:el['name'],
                    description:el['description'],
                    progress:el['progress'],
                    books:el['books']
                }
                this.tasks.push(this.newTask);
            }
            })
            
        },err=>this.handleError(err))
    }
    deleteT(id:Number):void{
        var tasks = this.tasks;
        console.log('id is '+id);
        this.userv.deleteTask(id,this.currentUser).subscribe(data => {
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }

        },
        err=>this.handleError(err));
    }
     deleteT1(id:Number):void{
        var tasks = this.tasks;
        console.log('id is '+id);
        this.userv.deleteTsk(id,this.currentUser).subscribe(data => {
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }

        },
        err=>this.handleError(err));
    }
    logout(){
        return this.http.get('localhost://code1/service.php?action=logout',{withCredentials:true})
        .map(res=>res.json())
        .subscribe(data=>{
            console.log('User logged out succesfully');
        },err=>console.log(err));
    }
  ngOnInit(){
      this.populateTasks();
  }
}
