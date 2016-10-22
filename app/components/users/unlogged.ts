import {Component,OnInit} from '@angular/core';
import {User} from '../../../user';
import {UserService} from '../../services/user.service';
@Component({
    moduleId:module.id,
    selector:'udata',
    templateUrl:'unloggedview.html'
})
export class unloggedUser implements OnInit{
    constructor(private userv:UserService){}
    signOut(){
        this.userv.logOut()
        .subscribe(data=>console.log('Logged out succesfully'),err=>console.log(err));
    }
    ngOnInit(){
        this.signOut();
    }
}