import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { discussionComponent } from './discussionComponent';
import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';
import {TaskService} from '../../services/task.service';
let comp:discussionComponent;
let fixture:ComponentFixture<discussionComponent>;
let de:DebugElement;
let el:HTMLElement;
let userserv:UserService;
describe('discussionComponent',()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[discussionComponent],
            providers:[GroupService,TaskService,UserService]
        }).compileComponents();
        fixture=TestBed.createComponent(discussionComponent);
        comp=fixture.componentInstance;
        userserv=TestBed.get(UserService);
    });
    it('should populate the array',()=>{
        comp.getGrUsers();
        expect(comp.currentUsers).toBeGreaterThan(0,()=>console.log('Array population failed'));
    });
});