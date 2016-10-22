import { Component } from '@angular/core';
import {TaskService} from './services/task.service';
import {UserService} from './services/user.service';
import {GroupService} from './services/group.service';
import {UserComponent} from './components/users/loggedInComponent';
import {RegistrationComponent} from './components/users/registrationComponent';
import {signinComponent} from './components/users/siginComponent';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[TaskService,UserService,GroupService],
})

export class AppComponent { }
