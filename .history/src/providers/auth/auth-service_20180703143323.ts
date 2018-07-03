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

{"uid":"4X6SoPVAg1PPUaZG7m6JqabgF8I2",
"displayName":"marco solarys 2008","photoURL":"https://lh6.googleusercontent.com/-wTpuCn-sE_0/AAAAAAAAAAI/AAAAAAAACs8/p4V3vABNGUY/photo.jpg","email":"solarys12@gmail.com","emailVerified":true,"phoneNumber":null,"isAnonymous":false,"providerData":[{"uid":"113400177010471017663","displayName":"marco solarys 2008","photoURL":"https://lh6.googleusercontent.com/-wTpuCn-sE_0/AAAAAAAAAAI/AAAAAAAACs8/p4V3vABNGUY/s96-c/photo.jpg","email":"solarys12@gmail.com","phoneNumber":null,"providerId":"google.com"}],"apiKey":"AIzaSyBPMlX714fgM0NsIZ4lyXcotBxGlxjk3Yc","appName":"[DEFAULT]","authDomain":"orga-a9998.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyBPMlX714fgM0NsIZ4lyXcotBxGlxjk3Yc","refreshToken":"AGdpqezRI_LIm8TeGlv0BIMK3K-FC1AwXff9g40EegB2RjYtWPBwV220qgtkE4ASBTcjXv8_e1RhMp5Y6bxkrNNovqBgFF6M_U3mCZYzUhIK1_oDY-N2vmEDGnrbtazkzgcy07PeYctcHOi1X8HnKG6yPazeJZUd-wgi8lYbvhaiBTiVR5_e7ymbqQVsxPfy6dw9D2cErpoygycKHJU73QK7qDoTiW43P56MQEyk7CMOicYHaSII1mqGTcEFNw6uTKgLH7lmWki-vbozhiV1zlqo6dMCmaVTdZ1_bgufUT2s2LBYDr_2GdahNZnw225iKt1XtGCLxv6AKk0lLTPtnZK2LMPmRxcmSRMMOmVNgmgJSmuJ2i3GTMY","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAwOTZhZDZmZjdjMTIwMzc5MzFiMGM0Yzk4YWE4M2U2ZmFkOTNlMGEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb3JnYS1hOTk5OCIsIm5hbWUiOiJtYXJjbyBzb2xhcnlzIDIwMDgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy13VHB1Q24tc0VfMC9BQUFBQUFBQUFBSS9BQUFBQUFBQUNzOC9wNFYzdkFCTkdVWS9waG90by5qcGciLCJhdWQiOiJvcmdhLWE5OTk4IiwiYXV0aF90aW1lIjoxNTMwNjE4OTQ3LCJ1c2VyX2lkIjoiNFg2U29QVkFnMVBQVWFaRzdtNkpxYWJnRjhJMiIsInN1YiI6IjRYNlNvUFZBZzFQUFVhWkc3bTZKcWFiZ0Y4STIiLCJpYXQiOjE1MzA2MTg5NDcsImV4cCI6MTUzMDYyMjU0NywiZW1haWwiOiJzb2xhcnlzMTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTM0MDAxNzcwMTA0NzEwMTc2NjMiXSwiZW1haWwiOlsic29sYXJ5czEyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.ioppSsAqy5M7Y9AmriPL-qNFYibvbOz0usxYBISI0NljIBjq6OoACvcwtw80LJCuMyhv7OKgBVRzrxNbLq6VmwbKMHW0OLBm4GKtVEhzJ7HdOWwOBY2qEDrYPjuV4cZT0ZlcOHBHInzpy9BUsN7nETu-KQ1IMDkg5IVJ8aeE43P_ZI1Vcby4SAFoBfmH2nxiu_z3azJVC4bV7YJtwm_Vma-sxI045fI0wRFn3s1a30iMnHBP67VBarwRcb3BJ9tEU4oaiUy9ev_--a25y5CkKZ6vdEqi4zZO80U5GnI2E9dea2L78ifMWbFXf44oT2CdCtWlA6MqGibBUx2b0s-HcQ","expirationTime":1530622547664},"redirectEventId":null,"lastLoginAt":"1530618947000",
"createdAt":"1527013739000"}"
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

interface Collection {
  name: string;
}

interface Respons {
  email: string;
}

@Injectable()
export class AuthService {
  success: any;
  email: any;
  constructor(
    public storage: AuthStorage,
    public afAuth: AngularFireAuth,
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
    this.storage.setProfile("", "", "");
  }

  googleAddUserSQL(email) {
    return this.http
      .post("http://orga-app.it/api/register", {
        username: email,
        email: email,
        google: true
      })
      .map(success => {
        this.success = success;
        return this.success;
      });
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      await this.googlePlus
        .login({
          webClientId:
            "120105818490-6aba3qfmvbr0fnr7a117canb59aqj74k.apps.googleusercontent.com",
          offline: true
        }).then( res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then( success => {
            let x: any = JSON.stringify(success);
            console.log("Firebase success: " + JSON.stringify(success));
            console.log("Email.success: " + success.email)
            console.log("X.success: " + x.email)
            
           return success;
          })
          .catch( error => {
            console.log("Firebase failure: " + JSON.stringify(error))
            return error;
          });
        }).catch(err => {
          console.error("Error: ", err)
          return err;
        });
    }
          /*this.afAuth.auth
            .signInWithCredential(
              firebase.auth.GoogleAuthProvider.credential(user.idToken)
            )
            .then(res => {
              this.email = res;
            });*/
   catch (err) {
      return err;
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log(credential.additionalUserInfo.profile.email);
      return credential.additionalUserInfo.profile.email;
    } catch (err) {
      console.log(err);
    }
  }

  logOutGoggle() {
    this.success = {};
    this.storage.setProfile("", "", "");
    return this.googlePlus.logout().then(msg => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      }
      return true;
    });
  }

  id(email): Observable<any> {
    return this.http.post("http://orga-app.it/api/user/memo/id", {
      email: email.email
    });
  }

  //Memos
  memoCreate(id, user, memo, date, time): Observable<any> {
    return this.http.post("http://orga-app.it/api/user/memo/create", {
      id_memo: id,
      id_user: user,
      date: date,
      time: time,
      memo: memo
    });
  }

  memoEdit(id_user, id_memo, memo, date, time) {
    return this.http.post<Memos>("http://orga-app.it/api/user/memo/edit", {
      id_user: id_user,
      id_memo: id_memo,
      memo: memo,
      date: date,
      time: time
    });
  }

  memoDelete(id_user, id_memo) {
    return this.http.post<Memos>("http://orga-app.it/api/user/memo/delete", {
      id_user: id_user,
      id_memo: id_memo
    });
  }

  memo(id) {
    return this.http.post<MemosLoad>("http://orga-app.it/api/user/memo", {
      id: id
    });
  }

  //Notes and Collections
  getCollection(id_user) {
    return this.http.post<Array<Collection>>(
      "http://orga-app.it/api/user/collection",
      {
        id_user: id_user
      }
    );
  }

  noteCreate(email, title, note, new_, newCollection, collection) {
    return this.http.post<Memos>("http://orga-app.it/api/user/note/create", {
      email: email,
      title: title,
      note: note,
      new: new_,
      newCollection: newCollection,
      collection: collection
    });
  }

  getNote(id_user, collection) {
    return this.http.post("http://orga-app.it/api/user/note", {
      id_user: id_user,
      collections: collection
    });
  }

  noteDelete(id_user, id_note, collection) {
    return this.http.post<Memos>("http://orga-app.it/api/user/note/delete", {
      id_user: id_user,
      id_note: id_note,
      collection: collection
    });
  }

  noteEdit(id_user, id_note, note, title, collection, new_, newCollection) {
    return this.http.post<Memos>("http://orga-app.it/api/user/note/edit", {
      id_user: id_user,
      id_note: id_note,
      note: note,
      title: title,
      collection: collection,
      new_: new_,
      newCollection: newCollection
    });
  }
}
