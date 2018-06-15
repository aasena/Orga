import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

//Storage Service

@Injectable()
export class AuthStorage {
  profile: any = {};
  pageActive: string;
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
    this.pageActive = active;
    console.log(this.pageActive);
  }

  getPage() {
    console.log(this.page);
    return this.page;
  }
}
