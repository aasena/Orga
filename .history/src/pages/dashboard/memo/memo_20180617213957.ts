import { Component } from "@angular/core";
import {
  AlertController,
  NavController,
  NavParams,
  ActionSheetController,
  App
} from "ionic-angular";
import { AuthStorage } from "../../../providers/auth/auth-storage";
import { AuthService } from "../../../providers/auth/auth-service";
import { Home } from "../../home/home";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: "page-memo",
  templateUrl: "memo.html"
})
export class MemoTab {
  profile: any;
  options: NativeTransitionOptions;
  notAdd = false;
  constructor(
    public localNotifications: LocalNotifications,
    public nativePageTransitions: NativePageTransitions,
    public alertCtrl: AlertController,
    public app: App,
    public service: AuthService,
    public storage: AuthStorage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public sheet: ActionSheetController
  ) {
    this.profile = storage.getProfile();
  }

  swipe(event) {
    if (event.direction === 2) {
      this.navCtrl.parent.select(2);
      this.options = {
        direction: "right",
        duration: 200,
        slowdownfactor: -1,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    }
    if (event.direction === 4) {
      this.navCtrl.parent.select(0);
      this.options = {
        direction: "left",
        duration: 200,
        slowdownfactor: -1,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    }
  }
  
  ionViewWillEnter() {
    if (this.storage.getMemo())
      this.notAdd = true;
    else
      this.notAdd = false;
  }

  ionViewWillLeave() {
    this.nativePageTransitions.slide(this.options);
  }

  profileSettings() {
    let actionSheet = this.sheet.create({
      title: "Modify your profile",
      buttons: [
        {
          text: "Impostazioni",
          handler: () => {
            //TODO
          }
        },
        {
          text: "Logout",
          handler: () => {
            if (this.profile.google) {
              this.service.logOutGoggle().then(res => {
                console.log(res);
                this.profile = {};
                this.app.getRootNav().push(Home);
              });
            } else {
              this.service.logoutSQL();
              this.profile = {};
              this.app.getRootNav().push(Home);
            }
            error => {
              let alert = this.alertCtrl.create({
                title: "Errore durante il logout",
                subTitle: `Si è verificato un errore durante il logout,
                          ti consigliamo di chiudere l'app.`,
                buttons: ["OK"]
              });
              alert.present();
            };
          }
        }
      ]
    });
    actionSheet.present();
  }

  add() {
    this.notAdd = !this.notAdd;
  }
}
