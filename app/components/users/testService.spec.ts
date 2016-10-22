import {inject,async} from '@angular/core/testing';
import {GroupService} from '../../services/group.service';
import {Http} from '@angular/http';
describe('it should get the group tasks',()=>{
   it('retrievs all the group tasks',async((gservice:GroupService)=>{
       return gservice.getGroupTasks(3).subscribe(result=>{
           expect(result.length).toBeGreaterThan(0,()=>{console.log('There was an error retrieving the group tasks')});
       });
   }));
});