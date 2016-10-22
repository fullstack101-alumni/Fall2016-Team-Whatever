import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { friendComponent } from './friendComponent';
let comp:friendComponent;
let fixture:ComponentFixture<friendComponent>;
let de:DebugElement;
let el:HTMLElement;
describe('discussionComponent',()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[friendComponent],
        }).compileComponents();
        fixture=TestBed.createComponent(friendComponent);
        comp=fixture.componentInstance;
    });
    it('should populate the array',()=>{
        expect(comp.getCont()).toBeGreaterThan(0,()=>console.log('Array population failed'));
    });
});