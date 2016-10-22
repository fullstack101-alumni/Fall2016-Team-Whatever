import {Component,OnInit} from '@angular/core';
import {User} from '../../../user';
import {GroupService} from '../../services/group.service';
import {Router} from '@angular/router';
@Component({
    moduleId:module.id,
    selector:'friend',
    templateUrl:'friendView.html'
})
export class friendComponent implements OnInit{
    friends:User[]=[];
    requests:User[]=[];
    myusers:User[]=[];
    groupId:Number;
    constructor(private gServ:GroupService,private route:Router){}
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
    getCont(){
        console.log('get Request method called');
        this.gServ.getFriendRequests()
        .subscribe(data=>{
            data.forEach((elem:Object)=>{
                var newUser={
                    _id:elem['user1id'],
                    fname:elem['id'],
                    lname:elem['lname'],
                    username:elem['username']
                }
                this.requests.push(newUser);
            });
        },err=>console.log(err));
    }
    getallUsr(){
        console.log('getusersmethod called');
        this.gServ.getAllusers()
        .subscribe(data=>{
            data.forEach((elem:Object)=>{
                var newUser={
                    _id:elem['id'],
                    fname:elem['fname'],
                    lname:elem['lname'],
                    username:elem['username']
                }
                this.myusers.push(newUser);
            });
        },err=>console.log(err));
    }
    sendFRequest(uid:Number){
        this.gServ.sendFriendRequest(uid)
        .subscribe(data=>console.log('Request sent succesfully'),err=>console.log(err));
    }
    sendFriendtoGroup(friendId:Number){
        this.gServ.sendfgreq(this.groupId,friendId)
        .subscribe(data=>console.log(data),err=>console.log(err));
    }
    confirmFRequest(uid:Number){
        this.gServ.confirmFriendRequest(uid)
        .subscribe(data=>console.log(data),err=>console.log(err));
    }
    goToFriends(){
        this.route.navigateByUrl('/friends');
    }

    ngOnInit(){
        this.getF();
        this.getCont();
        this.getallUsr();
    }
}