import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import { AuthStorage } from "../../../providers/auth/auth-storage";

@Component({
  selector: "page-todo",
  templateUrl: "todo.html"
})
export class TodoTab {
  profile: any;
  constructor(
    public storage: AuthStorage,
    public nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.profile = storage.getProfile();
  }

  swipe(event) {
    if (event.direction === 4) {
      this.navCtrl.parent.select(2);
    }
  }

  ionViewWillLeave() {
    let optionsRight: NativeTransitionOptions = {
      direction: "right",
      duration: 200,
      slowdownfactor: -1,
      iosdelay: 50,
      fixedPixelsBottom: 48
    };

    this.nativePageTransitions.slide(optionsRight);
  }
}
