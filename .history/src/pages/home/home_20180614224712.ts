import { Component } from "@angular/core";
import { Login } from "../login/login";
import { Signup } from "../signup/signup";
import { NavController, AlertController } from "ionic-angular";
import { Dashboard } from "../dashboard/dashboard";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { AuthService } from "../../providers/auth/auth-service";
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';

@Component({
  selector: "login-page",
  templateUrl: "login.html"
})
export class Home {

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public storage: AuthStorage,
    public service: AuthService,
    private gplus: GooglePlus,
    private platform: Platform
  ) {}

  google() {
    if (this.platform.is('cordova')) {
      this.service.nativeGoogleLogin();
    } else {
      this.service.();
    }
  }

  login() {
    this.navCtrl.push(Login);
  }

  signup() {
    this.navCtrl.push(Signup);

}
