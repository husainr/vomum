import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'vomum';

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyCdnXC9ZH96G4m5TJWzAL-YvLMZyzksnns',
      authDomain: 'trial-bcf05.firebaseapp.com',
      databaseURL: 'https://trial-bcf05.firebaseio.com',
      projectId: 'trial-bcf05',
      storageBucket: 'trial-bcf05.appspot.com',
      messagingSenderId: '94770815188'
    };
    firebase.initializeApp(config);
  }


}
