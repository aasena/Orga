import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Dashboard } from '../dashboard/dashboard';


@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
})
export class Signup {
  private user: FormGroup;
  error = {
    message: "",
    err: true
  }; 

  constructor(private nav: NavController, public auth: AuthService, private formBuilder: FormBuilder) {
    this.user = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  return() {
    this.nav.pop();
  }

  signup() {
    let data = this.user.value;
    if (!data.email) {
			return;
		};
    let credentials = {
			email: data.email,
			password: data.password
    };
    this.auth.doRegister(credentials)
			.then (
        () => this.nav.push(Dashboard),
        error => {
          this.error.message = error.message;
          this.error.err = false;
        }
      );
  }
}