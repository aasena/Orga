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
  constructor(public nativePageTransitions: NativePageTransitions, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewWillLeave() {
    let optionsRight: NativeTransitionOptions = {
      direction: 'right',
      duration: 200,
      slowdownfactor: -1,
      iosdelay: 50,
      fixedPixelsBottom: 50
    };
    
    this.nativePageTransitions.slide(optionsRight);
  }
}
