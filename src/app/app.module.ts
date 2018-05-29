import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Dashboard } from '../pages/dashboard/dashboard';

import { AuthService } from '../providers/auth-service/auth-service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environment/environment';

import { CalendarTab } from '../pages/dashboard/calendar/calendar';
import { ClipboardTab } from '../pages/dashboard/clipboard/clipboard';
import { EventTab } from '../pages/dashboard/event/event';
import { TodoTab } from '../pages/dashboard/todo/todo';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Login,
    Signup,
    Dashboard,
    CalendarTab,
    ClipboardTab,
    EventTab,
    TodoTab
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Login,
    Signup,
    Dashboard,
    CalendarTab,
    ClipboardTab,
    EventTab,
    TodoTab
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
