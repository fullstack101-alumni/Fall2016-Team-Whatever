import {Component,OnInit} from '@angular/core';
import {User} from '../../../user';
import {GroupService} from '../../services/group.service';
import {TaskService} from '../../services/task.service';
import {UserService} from '../../services/user.service';
import {Group} from '../../../group';
import {Router} from '@angular/router';
@Component({
    moduleId:module.id,
    selector:'group',
    templateUrl:'viewgroupComponent.html'
})
export class viewGroupComp implements OnInit{
    users:User[];
    _id:Number;
    name:string;
    description:string;
    admin_id:Number;
    groups:Group[]=[];
    otherGroups:Group[]=[];
    constructor(private gServ:GroupService,private taskService:TaskService,private userv:UserService,private route:Router){
        this.getUserId();
    }
    getUserId(){
        return this.userv.getUserData().subscribe(data=>{
            this.admin_id=+(data[0]['id']);
        })
    }
    getGroup(){
        console.log("Admin is is "+this.admin_id);
        this.gServ.getGr(this.admin_id)
        .subscribe(data=>{
            console.log('Get group method called');
            console.log(data);
            data.forEach((elem:Object)=>{
                var newGroup={
                    _id:elem['id'],
                    name:elem['name'],
                    description:elem['description'],
                    admin_id:elem['user_admin_id']
                }
                this.groups.push(newGroup);
            });
        },err=>console.log(err));
    }
    getOthersGroup(){
        console.log("Admin is is "+this.admin_id);
        this.gServ.getOtherGroups()
        .subscribe(data=>{
            console.log('Get group method called');
            console.log(data);
            data.forEach((elem:Object)=>{
                var newGroup={
                    _id:elem['id'],
                    name:elem['name'],
                    description:elem['description'],
                    admin_id:elem['user_admin_id']
                }
                this.otherGroups.push(newGroup);
            });
        },err=>console.log(err));
    }
     goToGroup(grid:Number){
        this.route.navigate(['/group',grid]);
    }
    goToDiscussion(did:Number){
        this.route.navigate(['/discuss',did])
    }

    deleteGroup(grid:Number){
        this.gServ.delGr(grid).subscribe(data=>{
            for(var i=0;i<this.groups.length;i++){
                if(this.groups[i]._id==grid){
                    this.groups.splice(i,1);
                }
            }
        },err=>console.log(err));
    }
    ngOnInit(){
        this.getUserId();
        this.getGroup();
        this.getOthersGroup();
    }
}