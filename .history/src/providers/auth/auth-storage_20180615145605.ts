import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

//Storage Service

@Injectable()
export class AuthStorage {
  profile: any = {};
  pageActive: any= {};
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

  setPage(page) {
    this.pageActive = page;
    console.log(this.pageActive);
  }

  getPage() {
    console.log(this.pageActive);
    return this.pageActive;
  }
}
