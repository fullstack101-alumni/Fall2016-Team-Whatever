import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
@Component({
    moduleId:module.id,
    selector:'logged',
    template:'<router-outlet></router-outlet>'
})
export class UserComponent implements OnInit{
    logged:boolean;
    constructor(private userService:UserService,private router:Router){}
     handleError(error:any):Promise<any>{
        console.error("An error occured",error);
        return Promise.reject(error.message || error);
    }
    checkLogged(){
        console.log("checkLogged called");
        this.userService.isLogged().subscribe(st=>{
            console.log("Request succesful");
            if(st.status==1){
                this.logged=st.status;
                this.router.navigate(['/logUser']);
            }
            else{
                this.logged=st.status;
                this.router.navigate(['/unlogUser'])
            }
        },err=>this.handleError(err))
    }
ngOnInit(){
    console.log("ngInit called");
    this.checkLogged();
}
}