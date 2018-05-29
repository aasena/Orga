import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthService } from "../../providers/auth-service/auth-service";
import { Login } from "../login/login";
import { Signup } from "../signup/signup";
import { Dashboard } from "../dashboard/dashboard";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class Home {

  constructor( public navCtrl: NavController, public auth: AuthService ) {}

  google() {
    this.auth.doGoogleLogin().then(res => {
      this.auth.setGoogle(res.additionalUserInfo.profile, res.credential);
      this.navCtrl.push(Dashboard);
    });
  }

  login() {
    this.navCtrl.push(Login);
  }

  signup() {
    this.navCtrl.push(Signup);
  }
  
}
