import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-notificaiton',
  templateUrl: './notificaiton.component.html',
  styleUrls: ['./notificaiton.component.css']
})
export class NotificaitonComponent implements OnInit {
  type: string = null;
  message: string = null;

  constructor(private notifier: NotificationService) {
    notifier.emitter.subscribe(data => {
      this.type = data.type;
      this.message = data.message;
      this.reset();
    });
  }

  ngOnInit() {
  }

  reset() {
    setTimeout(() => {
      this.type = null;
      this.message = null;
    }, 6000);
  }

}
