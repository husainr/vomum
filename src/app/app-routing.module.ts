import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FeedComponent} from './feed/feed.component';
import {FollowComponent} from './follow/follow.component';
import {ProfileComponent} from './profile/profile.component';
import {StatsComponent} from './stats/stats.component';
import {ExploreComponent} from './explore/explore.component';
import {NgModule} from '@angular/core';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {RouteGuard} from './auth/route-guard';
import {CommentsComponent} from './comments/comments.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'feed', component: FeedComponent, canActivate: [RouteGuard]},
  {path: 'follow', component: FollowComponent, canActivate: [RouteGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [RouteGuard]},
  {path: 'stats', component: StatsComponent, canActivate: [RouteGuard]},
  {path: 'explore', component: ExploreComponent, canActivate: [RouteGuard]},
  {path: 'comments/:name/:id', component: CommentsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
