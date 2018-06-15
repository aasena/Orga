import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import {  }

@Component({
  selector: "page-note",
  templateUrl: "note.html"
})
export class NoteTab {
  constructor(
    public storage: AuthStorage,
    public nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewWillLeave() {
    let optionsLeft: NativeTransitionOptions = {
      direction: "left",
      duration: 200,
      slowdownfactor: -1,
      iosdelay: 50,
      fixedPixelsBottom: 50
    };

    let optionsRight: NativeTransitionOptions = {
      direction: "right",
      duration: 200,
      slowdownfactor: -1,
      iosdelay: 50,
      fixedPixelsBottom: 50
    };

    if (this.storage.getPage() == "todo") {
      this.nativePageTransitions.slide(optionsLeft);
    } else {
      this.nativePageTransitions.slide(optionsRight);
    }
  }
}
