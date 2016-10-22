import {Component,OnInit} from '@angular/core';
import {User} from '../../../user';
import {UserService} from '../../services/user.service';
@Component({
    moduleId:module.id,
    selector:'udata',
    templateUrl:'loggedview.html'
})
export class loggedUser implements OnInit{
    first:string;
    last:string;
    username:string;
    pass:string;
    constructor(private uServ:UserService){
    }
    populate(){
        this.uServ.getUserData().subscribe(data=>{
            this.first=data.fname;
            this.last=data.lname;
            this.username=data.username;
            this.pass=data.password;
        })
    }
    ngOnInit(){
        this.populate();
    }
}