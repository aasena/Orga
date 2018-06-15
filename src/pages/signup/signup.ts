import { Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NavController, AlertController } from "ionic-angular";
import { Dashboard } from "../dashboard/dashboard";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { AuthService } from "../../providers/auth/auth-service";

@Component({
  selector: "signup-page",
  templateUrl: "signup.html"
})
export class Signup {
  private user: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public storage: AuthStorage,
    public service: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.formBuilder.group({
      username: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  return() {
    this.navCtrl.pop();
  }

  signup() {
    let data = this.user.value;
    if (!data.email) {
      return;
    }
    let credentials = {
      username: data.username,
      email: data.email,
      password: data.password
    };

    this.service.registerSQL(data, {}).subscribe(data => {
      if (data.success) {
        this.storage.setProfile(credentials.email, "", false);
        this.navCtrl.push(Dashboard);
      } else {
        const alert = this.alertCtrl.create({
          title: "Credentials Error",
          subTitle: data.message,
          buttons: ["OK"]
        });
        alert.present();
      }
    });
    this.storage.setProfile(credentials.email, credentials.username, false);
  }
}
