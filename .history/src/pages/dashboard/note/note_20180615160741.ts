import { Component } from "@angular/core";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import { AuthStorage } from "../../../providers/auth/auth-storage";

@Component({
  selector: "page-note",
  templateUrl: "note.html"
})
export class NoteTab {
  options: NativeTransitionOptions;
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
      this.navCtrl.parent.select(1);
      this.options = {
        direction: "left",
        duration: 200,
        slowdownfactor: -1,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    } else {
      this.navCtrl.parent.select(3);
      this.options = {
        direction: "right",
        duration: 200,
        slowdownfactor: -1,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    }
  }

  ionViewWillLeave() {
    this.nativePageTransitions.slide(this.options);
  }
}
