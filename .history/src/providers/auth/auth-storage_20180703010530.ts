import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

//Storage Service

@Injectable()
export class AuthStorage {
  profile: any = {};
  memo = false;
  note = false;
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
    this.memo = memo;
  }

  getMemo() {
    return this.memo;
  }

  setNote(note) {
    this.
  }
}
