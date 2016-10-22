import {Discussion} from '../../../discussion';
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
    selector:'discuss',
    templateUrl:'discussView.html'
})
export class discussionComponent implements OnInit{
    currDiscussion:string;
    dt:Date;
    newDiscussion:Discussion;
    admin_id:Number;
    currentUsers:User[]=[];
    currentTasks:Task[]=[];
    comments:Discussion[]=[];
    did:Number;
    constructor(private gServ:GroupService,private taskService:TaskService,private route:Router,private userv:UserService,private active:ActivatedRoute){
    }
     public getUserId(){
        return this.userv.getUserData().subscribe(data=>{
            this.admin_id=+(data[0]['id']);
        })
    }
    public getGroupId(){
        return this.active.params.subscribe(
            (param:any)=>{
                this.did=param['did'];
                console.log('The group id is '+this.did);
            }
        );
    }
      public getGrUsers(){
                  console.log("Did is "+this.did);
        return this.gServ.getGroupUsers(this.did)
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
    public getGrTasks(){
                  console.log("Did is "+this.did);        
        return this.gServ.getGroupTasks(this.did)
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
    addDiscussion(){
        var newDiscussion={
            title:'ToDo Task',
            content:this.currDiscussion,
            ddate:new Date()
        }
        this.comments.push(newDiscussion);
        this.gServ.addComment(this.did,this.currDiscussion)
        .subscribe(data=>console.log('Comment added succesfully'),err=>console.log(err));
        this.currDiscussion='';
    }
    getCurrComments(){
        return this.gServ.getComment(this.did)
        .subscribe(data=>{
            data.forEach((el:Object)=>{
               var newDiscussion={
                   title:'ToDo Task',
                   content:el['content'],
                   ddate:new Date()
               } 
               this.comments.push(newDiscussion);
            });
        },err=>console.log(err));
    }
    ngOnInit(){
         this.getGroupId();
        this.getUserId();
        this.getGrUsers();
        this.getGrTasks();
        this.getCurrComments();
    }
}