import {Group} from '../../group';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class GroupService{
    constructor(private http:Http){}
    createGr(name:string,adm_id:Number,description:string){
       return this.http.get('http://localhost/code1/service.php?action=creategroup&name='+name+'&user_admin_id='+adm_id+'&description='+description,{withCredentials:true})
        .map(res=>res.json());
    }
    createGr1(name:string,adm_id:Number,description:string){
       return this.http.get('http://localhost/code1/service.php?action=creategroup&name='+name+'&user_admin_id='+adm_id+'&description='+description)
        .map(res=>res.json());
    }
    getGr(uid:Number){
        return this.http.get('http://localhost/code1/service.php?action=getowngroups',{withCredentials:true}).map(res=>res.json());
    }
    delGr(gid:Number){
        return this.http.get('http://localhost/code1/service.php?action=deletegroup&id='+gid,{withCredentials:true})
        .map(res=>res.json());
    }
    getFriend(){
        return this.http.get('http://localhost/code1/service.php?action=getcontacts',{withCredentials:true})
        .map(res=>res.json());
    }
    getFriendRequests(){
        return this.http.get('http://localhost/code1/service.php?action=getcontactrequests',{withCredentials:true})
        .map(res=>res.json());
    }
    sendContactRequests(id:Number){
        return this.http.get('http/localhost/code1/service.php?action=sendcontactrequests&remoteuid='+id)
        .map(res=>res.json());
    }
    sendGroupRequest(id:Number){
        return this.http.get('http://localhost/code1/service.php?action=sendgrouprequest&groupid='+id)
        .map(res=>res.json());
    }
    sendfgreq(gid:Number,fid:Number){
        return this.http.get('http://localhost/code1/service.php?action=sendgrouprequest&groupid='+gid+'&userid='+fid,{withCredentials:true})
        .map(res=>res.json());
    }
    getAllusers(){
        return this.http.get('http://localhost/code1/service.php?action=searchusers&q=',{withCredentials:true})
        .map(res=>res.json());
    }
    sendFriendRequest(rid:Number){
        return this.http.get('http://localhost/code1/service.php?action=sendcontactrequest&remoteuid='+rid,{withCredentials:true})
        .map(res=>res.json());
    }
    confirmFriendRequest(rid:Number){
        return this.http.get('http://localhost/code1/service.php?action=confirmrequest&id='+rid,{withCredentials:true})
        .map(res=>res.json());
    }
    getGroupUsers(grid:Number){
        return this.http.get('http://localhost/code1/service.php?action=getgroupmembers&groupid='+grid,{withCredentials:true})
        .map(res=>res.json());
    }
    getGroupTasks(grid:Number){
        return this.http.get('http://localhost/code1/service.php?action=getgrouptasks&groupid='+grid,{withCredentials:true})
        .map(res=>res.json());
    }
    addTaskGroup(tid:Number,grid:Number){
        return this.http.get('http://localhost/code1/service.php?action=addtasktogroup&taskid='+tid+'&groupid='+grid,{withCredentials:true})
        .map(res=>res.json());
    }
    addTaskGroup1(tid:Number,grid:Number){
        return this.http.get('http://localhost/code1/service.php?action=addtasktogroup&taskid='+tid+'&groupid='+grid)
        .map(res=>res.json());
    }
    addFriendGroup(grid:Number,uid:Number){
        return this.http.get('http://localhost/code1/service.php?action=sendgrouprequest&groupid='+grid+'&userid='+uid,{withCredentials:true})
        .map(res=>res.json());
    }
    addFriendGroup1(grid:Number,uid:Number){
        return this.http.get('http://localhost/code1/service.php?action=sendgrouprequest&groupid='+grid+'&userid='+uid)
        .map(res=>res.json());
    }
    getOtherGroups(){
        return this.http.get('http://localhost/code1/service.php?action=getmembergroups',{withCredentials:true})
        .map(res=>res.json());
    }
    addComment(gid:Number,con:String){
        return this.http.get('http://localhost/code1/service.php?action=addcomment&groupid='+gid+'&content='+con,{withCredentials:true})
        .map(res=>res.json());
    }
    getComment(gid:Number){
        return this.http.get('http://localhost/code1/service.php?action=getcomments&groupid='+gid,{withCredentials:true})
        .map(res=>res.json());
    }
}