import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { HttpClient } from "@angular/common/http";
import * as shajs from "sha.js";
import { Platform } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { AuthStorage } from "../../providers/auth/auth-storage";

@Injectable()
export class AuthService {
  success: any;

  constructor(
    public storage: AuthStorage,
    public afAuth: AngularFireAuth, 
    public gplus: GooglePlus,
    public platform: Platform,
    public http: HttpClient,
    public googlePlus: GooglePlus
  ) {}

  loginSQL(data, opt) {
    let encrypted = shajs("sha256")
      .update(data.password)
      .digest("hex");
    return this.http
      .post(
        "http://192.168.1.10:3000/api/login",
        { email: data.email, password: encrypted.toString() },
        opt
      )
      .map(success => {
        this.success = success;
        return this.success;
      });
  }

  registerSQL(data, opt) {
    let encrypted = shajs("sha256")
      .update(data.password)
      .digest("hex");
    return this.http
      .post(
        "http://192.168.1.10:3000/api/register",
        {
          username: data.username,
          email: data.email,
          password: encrypted.toString()
        },
        opt
      )
      .map(success => {
        this.success = success;
        return this.success;
      });
  }

  logoutSQL() {
    this.success = {};
    this.storage.setProfile('','','')
  }

  googleAddUserSQL(email) {
    return this.http
      .post(
        "http://192.168.1.10:3000/api/register",
        {
          username: email,
          email: email,
          google: true
        }
      )
      .map(success => {
        this.success = success;
        return this.success;
      });
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId:
          "877633766779-a59jmb8v9s2p2ttci70ngh8p0ks8ddhl.apps.googleusercontent.com",
        offline: true,
        scopes: "andrea sena"
      });
      const response = await this.afAuth.auth.signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
      var x = response.stringify();
      return x.additionalUserInfo.profile.email;      
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return credential.additionalUserInfo.profile.email;
    } catch (err) {
      console.log(err);
    }
  }

  logOutGoggle() {
    this.success = {};
    this.storage.setProfile('','','')
    return this.afAuth.auth.signOut();
  }

  memoId(email) {
    return this.http
      .post(
        "http://192.168.1.10:3000/api/user/memoid",
        {
          email: email
        }
      )
      .subscribe(success => {
        console.log(success)
      });
  }
}
