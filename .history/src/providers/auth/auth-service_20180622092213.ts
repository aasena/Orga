import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { HttpClient } from "@angular/common/http";
import * as shajs from "sha.js";
import { Platform } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  success: any;
  email: any;
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
        "http://192.168.1.51:3000/api/login",
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
        "http://192.168.1.51:3000/api/register",
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
        "http://192.168.1.51:3000/api/register",
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
      await this.gplus.login({
        webClientId:
          "877633766779-a59jmb8v9s2p2ttci70ngh8p0ks8ddhl.apps.googleusercontent.com",
        offline: true,
        scopes: "andrea sena"
      }).then(function (user) {
        this.email = user.email;
      });
      await this.afAuth.auth.signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(this.email)
      )
      return this.email;      
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log(credential.additionalUserInfo.profile.email)
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

  memoId(email): Observable<any> {
    return this.http
      .post(
        "http://192.168.1.51:3000/api/user/memoid",
        {
          email: email.email
        }
      )
  }

  memoCreate(id, user, memo, date, time): Observable<any> {
    return this.http
      .post(
        "http://192.168.1.51:3000/api/user/memo",
        {
          id_memo: id,
          id_user: user,
          date: date,
          time: time,
          memo: memo
        }
      )
  }

  memo(id) {
    return this.http
      .post(
        "http://192.168.1.51:3000/api/user/memo",
        {
          id: id,
        }
      )
  } 
}
