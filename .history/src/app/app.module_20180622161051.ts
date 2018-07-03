import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { GooglePlus } from '@ionic-native/google-plus';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Media } from '@ionic-native/media';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Dashboard } from '../pages/dashboard/dashboard';
import { HomeTab } from '../pages/dashboard/home/home';
import { MemoTab } from '../pages/dashboard/memo/memo';
import { NoteTab } from '../pages/dashboard/note/note';
import { TodoTab } from '../pages/dashboard/todo/todo';

import { AuthService } from '../providers/auth/auth-service';
import { AuthStorage } from '../providers/auth/auth-storage';

import { environment } from '../environment/environment';


@NgModule({
  declarations: [
    MyApp,
    Home,
    Login,
    Signup,
    HomeTab,
    MemoTab,
    NoteTab,
    TodoTab
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    DashBoard
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Login,
    Signup,
    HomeTab,
    MemoTab,
    NoteTab,
    TodoTab
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthStorage,
    NativePageTransitions,
    GooglePlus,
    Media,
    LocalNotifications
  ]
})
export class AppModule {}
