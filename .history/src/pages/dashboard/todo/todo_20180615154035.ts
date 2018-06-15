import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";

@Component({
  selector: "page-todo",
  templateUrl: "todo.html"
})
export class TodoTab {
  constructor(
    public alertCtrl: AlertController,
    public nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  swipe(event) {
    if(event.direction === 4) {
      let alert = this.alertCtrl.create({
        title: "4",
        subTitle: `4`,
        buttons: ["OK"]
      });
      alert.present();
      this.navCtrl.parent.select(3);
    }

    if(event.direction === 3) {
      let alert = this.alertCtrl.create({
        title: "3",
        subTitle: `3`,
        buttons: ["OK"]
      });
      alert.present();
      this.navCtrl.parent.select(3);
    }

    if(event.direction === 2) {
      let alert = this.alertCtrl.create({
        title: "2",
        subTitle: `2`,
        buttons: ["OK"]
      });
      alert.present();
      this.navCtrl.parent.select(3);
    }

    if(event.direction === 1) {
      let alert = this.alertCtrl.create({
        title: "1",
        subTitle: `1`,
        buttons: ["OK"]
      });
      alert.present();
      this.navCtrl.parent.select(3);
    }
  }

  ionViewWillLeave() {
    let optionsRight: NativeTransitionOptions = {
      direction: "right",
      duration: 200,
      slowdownfactor: -1,
      iosdelay: 50,
      fixedPixelsBottom: 50
    };

    this.nativePageTransitions.slide(optionsRight);
  }
}
