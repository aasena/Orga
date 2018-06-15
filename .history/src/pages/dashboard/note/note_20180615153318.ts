import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
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
  constructor (
    public storage: AuthStorage,
    public nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(3);
      this.options = {
        direction: 'right',
        duration: 200,
        slowdownfactor: -1,
        iosdelay: 50,
        fixedPixelsBottom: 50
      };
    }
    if(event.direction === 4) {
      this.navCtrl.parent.select(1);
      this.options = {
        direction: 'left',
        duration: 200,
        slowdownfactor: -1,
        iosdelay: 50,
        fixedPixelsBottom: 50
      };
    }
  }

  ionViewWillLeave() {
    this.nativePageTransitions.slide(this.options);
  }
}
