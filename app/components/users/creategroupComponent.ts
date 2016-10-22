import {Component} from '@angular/core';
import {User} from '../../../user';
import {GroupService} from '../../services/group.service';
import {TaskService} from '../../services/task.service';
import {UserService} from '../../services/user.service';
import {Group} from '../../../group';
import {Router} from '@angular/router'
@Component({
    moduleId:module.id,
    selector:'group',
    templateUrl:'creategroupComponentView.html'
})
export class crGroupComp{
    users:User[];
    _id:Number;
    name:string;
    description:string;
    admin_id:Number;
    constructor(private gServ:GroupService,private taskService:TaskService,private route:Router,private userv:UserService){
        this.getUserId();
    }
    getUserId(){
        return this.userv.getUserData().subscribe(data=>{
            this.admin_id=+(data[0]['id']);
        })
    }
    createGroup(){
        var newGroup={
            name:this.name,
            description:this.description,
            admin_id:this.admin_id
        }
        this.gServ.createGr(this.name,this.admin_id,this.description)
        .subscribe(data=>{
            this.name='';
            this.description='';
        },err=>console.log(err));
    }
    createGroup1(){
        var newGroup={
            name:this.name,
            description:this.description,
            admin_id:this.admin_id
        }
        this.gServ.createGr1(this.name,this.admin_id,this.description)
        .subscribe(data=>{
            this.name='';
            this.description='';
        },err=>console.log(err));
    }
    goBack(){
        this.route.navigate(['/user',this.admin_id]);
    }
}