import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { HttpClient } from "@angular/common/http";
import * as shajs from "sha.js";
import { Platform, AlertController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { Observable } from "rxjs";

interface MemosLoad {
  code: number;
  success: boolean;
  memo: Object;
  id_user: any;
}

interface Memos {
  title: string;
  sub: string;
}

@Injectable()
export class AuthService {
  success: any;
  email: any;
  constructor(
    public alertCtrl: AlertController,
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
        "http://orga-app.it/api/login",
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
        "http://orga-app.it/api/register",
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
        "http://orga-app.it/api/register",
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
          "877633766779-c0u3h36b749habnjr40jef6sfr55vt98.apps.googleusercontent.com",
        offline: true
      }).then(function (user) {
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken))
          .then((success) => {
              this.email = success).toString();
          })
          .catch((gplusErr) => {
              return gplusErr;
          });
        return this.email;
      });
            
    } catch (err) {
      return err;
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

  displayAlert(value,title)
  {
      let coolAlert = this.alertCtrl.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
                    {
                        text: "Ok"
                    }
               ]
      });
      coolAlert.present();
}

  logOutGoggle() {
    this.success = {};
    this.storage.setProfile('','','')
    return this.googlePlus.logout().then(
      (msg) => {
            if(firebase.auth().currentUser){
              firebase.auth().signOut();
            }
    });
  }

  memoId(email): Observable<any> {
    return this.http
      .post(
        "http://orga-app.it/api/user/memo/id",
        {
          email: email.email
        }
      )
  }

  memoCreate(id, user, memo, date, time): Observable<any> {
    return this.http
      .post(
        "http://orga-app.it/api/user/memo/create",
        {
          id_memo: id,
          id_user: user,
          date: date,
          time: time,
          memo: memo
        }
      )
  }

  memoEdit(id_user, id_memo, memo, date, time) {
    return this.http
      .post<Memos>(
        "http://orga-app.it/api/user/memo/edit",
        {
          id_user: id_user,
          id_memo: id_memo,
          memo: memo,
          date: date,
          time: time
        }
      )
  } 

  memo(id) {
    return this.http
      .post<MemosLoad>(
        "http://orga-app.it/api/user/memo",
        {
          id: id
        }
      )
  } 
}
