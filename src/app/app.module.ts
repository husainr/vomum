import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FeedComponent } from './feed/feed.component';
import { FollowComponent } from './follow/follow.component';
import { StatsComponent } from './stats/stats.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {RouteGuard} from './auth/route-guard';
import { NotificaitonComponent } from './notificaiton/notificaiton.component';
import {NotificationService} from './shared/notification.service';
import {MyfireService} from './shared/myfire.service';
import {UserService} from './shared/user.service';
import { PostComponent } from './shared/post/post.component';
import { CommentsComponent } from './comments/comments.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeedComponent,
    FollowComponent,
    StatsComponent,
    ExploreComponent,
    ProfileComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NotificaitonComponent,
    PostComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [RouteGuard, NotificationService, MyfireService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
