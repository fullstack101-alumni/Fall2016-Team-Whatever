import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private http:Http){
        console.log('Task Service Initialized...');
    }
    getTasks(){
        return this.http.get('http://localhost/code1/service.php?action=getindependenttasks',{withCredentials:true})
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

   deleteTask(id:Number){
        return this.http.delete('http://localhost/code1/service.php?action=deletetask&id='+id)
            .map(res => res.json());
    }
    getUdata(){
        return this.http.get('http://localhost/code1/service.php?action=getdata').map(res=>res.json());
    }
}