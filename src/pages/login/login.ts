import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
})
export class Login {

  error = {
    message: "",
    err: true
  }; 
  private user : FormGroup;

  constructor(public navCtrl: NavController, public auth: AuthService, private formBuilder: FormBuilder) {
    this.user = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    let data = this.user.value;
    if (!data.email) {
			return;
		}
    let credentials = {
			email: data.email,
      password: data.password,
      profile: false
    };
		this.auth.doLogin(credentials)
			.then (
        () => {
          this.auth.setPC(credentials.email)
          this.navCtrl.push(Dashboard)
        },
        error => {
          this.error.message = error.message;
          this.error.err = false;
        }
      );
  }

  return() {
    this.navCtrl.pop();
  }
  
}
