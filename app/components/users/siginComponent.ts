import {Component,OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import{Http} from '@angular/http';
@Component({
    moduleId:module.id,
    selector:'sign-in',
    templateUrl:'signinView.html'
})
export class signinComponent{
    user:string;
    pass:string;
    id:Number;
    constructor(private uservice:UserService,private router:Router,private http:Http){}
     handleError(error:any):Promise<any>{
        console.error("An error occured",error);
        return Promise.reject(error.message || error);
    }
    
    logUser(){
        this.uservice.userlogin(this.user,this.pass).subscribe(data=>{
            console.log('Login was succesful');
            console.log(data);
            this.id=data['id'];
            console.log('User id is '+this.id);
            console.log("User logged in succesfully");
            this.router.navigate(['/user',this.id]);
        },error=>{this.router.navigate(['/signin'])});
    }
}