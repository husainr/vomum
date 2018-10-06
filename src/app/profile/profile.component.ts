import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyfireService} from '../shared/myfire.service';
import {NotificationService} from '../shared/notification.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  postLists: any = [];
  personalPostsRef: any;
  lat: number;
  lng: number;
  name = '';
  desc = '';

  name1 = '';
  desc1 = '';

  constructor(private myFire: MyfireService, private notifier: NotificationService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
          // alert('Geolocation is' + this.lat + ' ' + this.lng);
         // console.log(this.lat + ' ' + this.lng);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }




    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.myFire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      });
    });
  }

  onFileSelection(event) {
    this.name1 = this.name;
      this.desc1 = this.desc;
    // console.log(this.name1 + ' ' + this.desc1 + ' ' + this.lat + ' ' + this.lng);
    const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        this.myFire.uploadFile(file)
          .then(data => {
            this.notifier.display('success', 'Thank you for not letting it go! :)');
            this.myFire.handleImageUpload(data, this.name1, this.desc, this.lat, this.lng);
          })
          .catch(err => {
            this.notifier.display('error', err.message);
          });
      }
  }

  ngOnDestroy() {
    this.personalPostsRef.off();
  }
}
