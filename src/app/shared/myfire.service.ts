import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()

export class MyfireService {

  constructor(private user: UserService) {}

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());
  }
  generateRandomName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  uploadFile(file) {
    const fileName = this.generateRandomName();
    const fileRef = firebase.storage().ref().child('image/' + fileName);
    const uploadTask = fileRef.put(file);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', snapshot => {

      }, error => {
        reject(error);

      }, () => {
        const fileUrl = uploadTask.snapshot.downloadURL;
          resolve({fileName, fileUrl});
      });
    });

  }

  handleImageUpload(data, name, desc, lat, lng) {
    const user = this.user.getProfile();

    const newPersonalPostKey = firebase.database().ref().child('profile').push().key;
    const personalPostDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      iname: name,
      idesc: desc,
      ilat: lat,
      ilng: lng
    };

    const allPostKey = firebase.database().ref().child('allposts').push().key;
    const allPostsDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      iname: name,
      idesc: desc,
      ilat: lat,
      ilng: lng,
      creationDate: new Date().toString(),
      uploadedBy: user
    };

    const imageDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      iname: name,
      idesc: desc,
      ilat: lat,
      ilng: lng,
      uploadedBy: user,
      favouriteCount: 0
    };

    const updates = {};
    updates['/myposts/' + user.uid + '/' + newPersonalPostKey ] = personalPostDetails;
    updates['/allpots/' + allPostKey] = allPostsDetails;
    updates['/images/' + data.fileName] = imageDetails;

    return firebase.database().ref().update(updates);
  }

  getUserPostsRef(uid) {
    return firebase.database().ref('myposts').child(uid);
  }

  handlefavoriteClicked(imageData ) {
    const uid = firebase.auth().currentUser.uid;
    const updates = {};

    updates['/images/' + imageData.name + '/oldFavoriteCount'] = imageData.favouriteCount;
    updates['/images/' + imageData.name + '/favouriteCount'] = imageData.favouriteCount + 1;
    updates['/favorites/' + uid + '/' + imageData.name] = imageData;

    return firebase.database().ref().update(updates);

  }

  followUser(uploadedByUser) {
    const uid = firebase.auth().currentUser.uid;
    const updates = {};

    updates['/follow/' + uid + '/' + uploadedByUser.uid] = true;

    return firebase.database().ref().update(updates);

  }


  handleCommentUpload(imgname, id, comment) {
    const user = this.user.getProfile();

    // const newPersonalPostKey = firebase.database().ref().child('comment').push().key;
    const personalPostDetails = {
      uid: id,
      imgname: imgname,
      comment: comment,
    };


    const updates = {};
    updates['/comments/' + imgname + '/' + id ] = personalPostDetails;

    return firebase.database().ref().update(updates);
  }
}



