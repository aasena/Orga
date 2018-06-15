import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { AngularFireAuth } from "angularfire2/auth";

//Storage Service

@Injectable()
export class AuthStorage {
  profile: any = {};
  page = '';
  constructor() {}

  setProfile(email, username, google) {
    this.profile = {
      email: email,
      username: username,
      google: google
    };
  }

  getProfile() {
    return this.profile;
  }

  setPage(active) {
    this.page = active;
  }

  getPage() {
    return this.page;
  }
}
