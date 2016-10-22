import {Component,OnInit,Input} from '@angular/core';
import {User} from '../../../user';
import {Task} from '../../../task';
import {GroupService} from '../../services/group.service';
import {TaskService} from '../../services/task.service';
import {UserService} from '../../services/user.service';
import {Group} from '../../../group';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
    moduleId:module.id,
    selector:'group-data',
    templateUrl:'groupView.html'
})
export class groupDataComponent implements OnInit{
    @Input() currentUsers:User[]=[];
    @Input() currentTasks:Task[]=[];
    @Input() friends:User[]=[];
    @Input() tasks:Task[]=[];
    gid:Number;
    _id:Number;
    name:string;
    description:string;
    admin_id:Number;
    constructor(private gServ:GroupService,private taskService:TaskService,private route:Router,private userv:UserService,private active:ActivatedRoute){
        this.getUserId();
    }
    getUserId(){
        return this.userv.getUserData().subscribe(data=>{
            this.admin_id=+(data[0]['id']);
        })
    }
    getGroupId(){
        return this.active.params.subscribe(
            (param:any)=>{
                this.gid=param['grid'];
                console.log('The group id is '+this.gid);
            }
        );
    }
    getGrUsers(){
        return this.gServ.getGroupUsers(this.gid)
        .subscribe(data=>{
            data.forEach((el:Object)=>{
                if(el['memberid']){
                    var newUser={
                    _id:el['memberid'],
                    fname:'Emiljano',
                    lname:'Gjiriti',
                    username:'egj1996'
                }
                this.currentUsers.push(newUser);
                }
            });
        },err=>console.log(err));
    }
    getGrTasks(){
        return this.gServ.getGroupTasks(this.gid)
        .subscribe(data=>{
            data.forEach((el:Object)=>{
                var newTask={
                    _id:el['id'],
                    name:el['name'],
                    description:el['description'],
                    progress:el['progress'],
                    books:el['books']
                }
                this.currentTasks.push(newTask);
            });
        },err=>console.log(err));
    }
    getF(){
        console.log('getFriends method called');
        this.gServ.getFriend()
        .subscribe(data=>{
            data.forEach((elem:Object)=>{
                var newUser={
                    _id:elem['id'],
                    fname:elem['fname'],
                    lname:elem['lname'],
                    username:elem['username']
                }
                this.friends.push(newUser);
            });
        },err=>console.log(err));
    }
    getAllTasks(){
         this.taskService.getTasks()
            .subscribe(data=>{
                data.forEach((elem:Object)=>{
                    var newTask={
                        _id:elem['id'],
                        name:elem['name'],
                        description:elem['description'],
                        progress:elem['progress'],
                        books:elem['books']
                    }
                    this.tasks.push(newTask);
                });
            });
    }
    addTtoGr(tid:Number,grid:Number){
         this.gServ.addTaskGroup(tid,grid)
        .subscribe(data=>console.log('Task added successfully'),err=>console.log(err));
         this.gServ.getGroupTasks(this.gid)
        .subscribe(data=>{
            data.forEach((el:Object)=>{
                if(el['id']==tid){
                    var newTask={
                    _id:el['id'],
                    name:el['name'],
                    description:el['description'],
                    progress:el['progress'],
                    books:el['books']
                }
                this.currentTasks.push(newTask);
                }
            });
        },err=>console.log(err));
        for(var i = 0;i < this.tasks.length;i++){
                    if(this.tasks[i]._id == tid){
                        this.tasks.splice(i, 1);
                    }
                }
    }
     addTtoGr1(tid:Number,grid:Number){
        return this.gServ.addTaskGroup1(tid,grid)
        .subscribe(data=>console.log('Task added successfully'),err=>console.log(err));
    }
    addUtoGr(grid:Number,uid:Number){
        console.log('Inside the addUtoGr function');
        this.gServ.addFriendGroup(grid,uid)
        .subscribe(data=>{
         console.log('User added succesfully');  
        },err=>console.log(err));
           this.userv.getusData(uid)
            .subscribe(data=>{
                console.log('Inside the udata function');
                console.log(data);
                var newUser={
                _id:data[0]['id'],
                fname:data[0]['fname'],
                lname:data[0]['lname'],
                username:data[0]['username']
            }
            console.log(newUser);
            this.currentUsers.push(newUser);
            
            },err=>console.log(err));
            for(var i = 0;i < this.friends.length;i++){
                    if(this.friends[i]._id ==uid){
                        this.friends.splice(i, 1);
                    }
                }
    }
    addUtoGr1(grid:Number,uid:Number){
        return this.gServ.addFriendGroup1(grid,uid)
        .subscribe(data=>console.log('User added successfully'),err=>console.log(err));
    }
    ngOnInit(){
        this.getGroupId();
        this.getUserId();
        this.getGrUsers();
        this.getGrTasks();
        this.getF();
        this.getAllTasks();
    }
}