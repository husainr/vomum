import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';
import {MyfireService} from '../shared/myfire.service';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  all: any = [];
  allRef: any;
  loadMoreRef: any;

  constructor(private myFire: MyfireService, private notifier: NotificationService) { }

  ngOnInit() {
    this.allRef = firebase.database().ref('allpots').limitToFirst(3);
    this.allRef.on('child_added', data => {
      this.all.push({
        key: data.key,
        data: data.val()
      });
    });
  }

  onLoadMore() {
    if (this.all.length > 0) {
      const lastLoadedPost = _.last(this.all);
      const lastLoadedPostKey = lastLoadedPost.key;

      this.loadMoreRef = firebase.database().ref('allpots').startAt(null, lastLoadedPostKey).limitToFirst(3 + 1);
      this.loadMoreRef.on('child_added', data => {
        if (data.key === lastLoadedPostKey) {
          return;
        } else {
          this.all.push({
            key: data.key,
            data: data.val()
          });
        }
      });
    }
  }

  ngOnDestroy() {
    this.allRef.off();
    if (this.loadMoreRef) {
      this.loadMoreRef.off();
    }


  }

  onFavoritesClicked(imageData) {
    this.myFire.handlefavoriteClicked(imageData).
      then(data => {
        this.notifier.display('success', 'You have voted successfully');

    }).catch(err => {
      this.notifier.display('error', 'vote not done');

    });
  }

  onFollowClicked(imageData) {
    this.myFire.followUser(imageData.uploadedBy).
      then(() => {
      this.notifier.display('success', 'following' + imageData.iname + '!');
    }).catch(err => {
      this.notifier.display('error', err);

    });
  }


}
