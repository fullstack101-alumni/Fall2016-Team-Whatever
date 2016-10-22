import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService{
    constructor(private http:Http){
        console.log('User Service Initialized');
    }
    isLogged(){
        return this.http.get('http://localhost/code1/service.php?action=getstatus').map(response=>response.json());
    }
    getUserData(){
        return this.http.get('http://localhost/code1/service.php?action=getdata',{withCredentials:true}).map(response=>response.json());
    }
    userlogin(uname:string,pass:string){
        var url='http://localhost/code1/service.php?action=login&username='+uname+'&password='+pass;
        console.log(url);
        return this.http.get(url,{withCredentials:true})
        .map(res=>res.json());
    }
    userRegistration(first:string,last:string,user:string,pass:string){
        return this.http.get('http://localhost/code1/service.php?action=adduser&fname='+first+"&lname="+last+"&username="+user+"&password="+pass)
        .map(res=>res.json());
    }
    getIndividualTasks(){
        return this.http.get('http://localhost/code1/service.php?action=getindependenttasks',{withCredentials:true})
        .map(res=>res.json());
    }
    deleteTask(id:Number,uid:Number){
        console.log('Deleting from the database');
        return this.http.get('http://localhost/code1/service.php?action=deletetask&id='+id+'&userid='+uid,{withCredentials:true})
            .map(res => res.json());
    }
    deleteTsk(id:Number,uid:Number){
        console.log('Deleting from the database');
        return this.http.get('http://localhost/code1/service.php?action=deletetask&id='+id+'&userid='+uid)
            .map(res => res.json());
    }
    addTask(name:string,desc:string,prog:string,book:string,uid:Number){
        console.log("Request sent");
        return this.http.get('http://localhost/code1/service.php?action=inserttask&name='+name+'&description='+desc+'&progress='+prog+'&userid='+uid,{withCredentials:true})
            .map(res => res.json());
    }
    addTask1(name:string,desc:string,prog:string,book:string,uid:Number){
        console.log("Request sent");
        return this.http.get('http://localhost/code1/service.php?action=inserttask&name='+name+'&description='+desc+'&progress='+prog+'&userid='+uid,{withCredentials:false})
            .map(res => res.json());
    }
    getContact(){
        return this.http.get('http://localhost/code1/service.php?action=getcontacts',{withCredentials:true})
        .map(res=>res.json());
    }
    logOut(){
        return this.http.get('http://localhost/code1/service.php?action=logout',{withCredentials:true})
        .map(res=>res.json());
    }
    getusData(uid:Number){
        return this.http.get('http://localhost/code1/service.php?action=getudata&userid='+uid,{withCredentials:true})
        .map(res=>res.json());
    }

}