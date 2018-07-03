import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

//Storage Service

@Injectable()
export class AuthStorage {
  profile: any = {};
  memo: any = {};
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

  setMemo(memo) {
    this.pageActive = {
      active: page
    }
    console.log(this.pageActive);
  }

  getPage() {
    console.log(this.pageActive);
    return this.pageActive;
  }
}
