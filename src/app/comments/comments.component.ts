import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MyfireService} from '../shared/myfire.service';
import {NotificationService} from '../shared/notification.service';
import * as firebase from 'firebase';
import _ from 'lodash';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  uid: {name: string, id: string};
  cmmnt1 = '';
  cmmnt = '';
  imgname: string;
  id: string;

  refArray: any = [];
  postList: any = [];


  constructor(private routes: ActivatedRoute, private myFire: MyfireService, private notifier: NotificationService) {
    this.uid = {name: this.routes.snapshot.params['name'],
    id: this.routes.snapshot.params['id']};
    this.imgname = this.routes.snapshot.params['name'];
    // console.log(this.imgname);
  }

  ngOnInit() {
    // console.log(this.imgname);
    const followRef = firebase.database().ref('comments').child(this.imgname);

     // console.log(followRef);

   followRef.once('value', data => {
      const uidListOfOtherUsers = _.keys(data.val());
      this.getCommentsFromOtherUsers(uidListOfOtherUsers);
    });
  }

  getCommentsFromOtherUsers(uidList) {
    for (let count = 0; count < uidList.length; count++) {
      // console.log('hello');
      this.refArray[count] = uidList[count];
      // console.log(this.refArray[count]);

      // this.refArray[count].snapshot.getKey();
      // console.log(this.refArray[count].snapshot.getKey());
      // this.postList.push(this.refArray[count].snapshot.val());
    }
  }

  onCommentSelection() {
    this.imgname = this.uid.name;
    this.id = this.uid.id;
    this.cmmnt1 = this.cmmnt;
    this.myFire.handleCommentUpload(this.imgname, this.id, this.cmmnt1);
    this.notifier.display('success', 'try');

  }

}
