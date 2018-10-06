import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  name: string;
  uid: string;
  email: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;
      } else {
        this.name = null;
        this.email = null;
        this.uid = null;
      }
    });

    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        const user = this.userService.getProfile();
        if (user && user.name) {
          this.name = user.name;
          this.email = user.email;
          this.uid = user.uid;
        }
        // logged in
        this.isLoggedIn = true;
        this.router.navigate(['/feed']);
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogOut() {
    firebase.auth().signOut()
      .then(() => {
          this.userService.destroy();
          this.isLoggedIn = false;
        });
  }

}
