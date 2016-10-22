import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
@Component({
    moduleId:module.id,
    selector:'register',
    templateUrl:'registerView.html'
})
export class RegistrationComponent{
    first:string;
    last:string;
    uname:string;
    password:string;
    constructor(private uservice:UserService,private router:Router){}
    registerUser(ev:Event){
        ev.preventDefault();
        console.log("Register User called succesfully");
        this.uservice.userRegistration(this.first,this.last,this.uname,this.password)
        .subscribe(data=>{
            console.log("User added succesfully");
            this.first="";
            this.last="";
            this.uname="";
            this.password="";
            this.router.navigate(['/signin']);
        },err=>{
            this.first="";
            this.last="";
            this.uname="";
            this.password="";
            this.router.navigate(['/register']);
        })
    }
}