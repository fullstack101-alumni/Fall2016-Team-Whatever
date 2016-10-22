import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {RouterModule} from '@angular/router';
import {UserComponent} from './components/users/loggedInComponent';
import {loggedUser} from './components/users/logged';
import {unloggedUser} from './components/users/unlogged';
import {RegistrationComponent} from './components/users/registrationComponent'
import {signinComponent} from './components/users/siginComponent';
import {UserData} from './components/users/signedUser';
import {crGroupComp} from './components/users/createGroupComponent';
import {viewGroupComp} from './components/users/viewGroupComponent';
import {friendComponent} from './components/users/friendComponent';
import {groupDataComponent} from './components/users/groupData';
import {discussionComponent} from './components/users/discussionComponent';
@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule,
  RouterModule.forRoot([{path:'logUser',component:loggedUser},
  {path:'unlogUser',component:unloggedUser},
  {path:'signin',component:signinComponent},
  {path:'register',component:RegistrationComponent},
  {path:'',component:AppComponent},
  {path:'user/:id',component:UserData},
  {path:'createT',component:TasksComponent},
  {path:'creategroup',component:crGroupComp},
  {path:'viewGroup',component:viewGroupComp},
  {path:'crTask',component:TasksComponent},
  {path:'friends',component:friendComponent},
  {path:'group/:grid',component:groupDataComponent},
  {path:'discuss/:did',component:discussionComponent}
  ])],
  declarations: [AppComponent, TasksComponent,UserComponent,loggedUser,unloggedUser,RegistrationComponent,signinComponent,UserData,
  crGroupComp,viewGroupComp,friendComponent,groupDataComponent,discussionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
