import { Component } from "@angular/core";
import { Login } from "../login/login";
import { Signup } from "../signup/signup";
import { NavController, AlertController } from "ionic-angular";
import { Dashboard } from "../dashboard/dashboard";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { AuthService } from "../../providers/auth/auth-service";

@Component({
  selector: "login-page",
  templateUrl: "login.html"
})
export class Home {
  private user: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public storage: AuthStorage,
    public service: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

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
