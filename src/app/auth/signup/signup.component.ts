import { Component, OnInit } from '@angular/core';
import {Form, NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(userData => {
      userData.sendEmailVerification();
      const message = 'Thank you for registering. A verification email has been sent to ' + email + ' .' +
        ' Please verify your email using the link provided.';
      this.notifier.display('success', message);
      return firebase.database().ref('users/' + userData.uid).set({
        email: email,
        uid: userData.uid,
        registrationDate: new Date().toString(),
        name: name
      }).then(() => {
          firebase.auth().signOut();
      });
    }).catch(err => {
      this.notifier.display('error', err.message);
      console.log(err);
    });
  }

}
