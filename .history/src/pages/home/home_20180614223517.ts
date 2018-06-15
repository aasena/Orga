import { Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NavController, AlertController } from "ionic-angular";
import { Dashboard } from "../dashboard/dashboard";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { AuthService } from "../../providers/auth/auth-service";

@Component({
  selector: "login-page",
  templateUrl: "login.html"
})
export class H {
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

  login() {
    let data = this.user.value;
    if (!data.email) {
      return;
    }
    let credentials = {
      email: data.email,
      password: data.password
    };

    this.service.loginSQL(credentials, {}).subscribe(data => {
      if (data.success) {
        this.storage.setProfile(credentials.email, "", false);
        this.navCtrl.push(Dashboard);
      } else {
        const alert = this.alertCtrl.create({
          title: 'Credentials Error',
          subTitle: data.message,
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  return() {
    this.navCtrl.pop();
  }
}
