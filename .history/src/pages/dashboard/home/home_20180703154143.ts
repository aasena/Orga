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

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomeTab {
  profile: any;
  visible = false;
  memos: any;
  collections = [];
  constructor(
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

  ionViewWillLeave() {
    let optionsLeft: NativeTransitionOptions = {
      direction: "left",
      duration: 200,
      iosdelay: 50,
      fixedPixelsBottom: 48
    };

    this.nativePageTransitions.slide(optionsLeft);
  }

  ionViewWillEnter() {
    let id;
    this.memos = {};
    this.service.id(this.profile).subscribe(response => {
      id = response.data.user;

      this.service.memo(id).subscribe(res => {
        this.memos = res.memo;
      });
    });

    this.collections = [];
    this.service.id(this.profile).subscribe(response => {
      id = response.data.user;

      this.service.getCollection(id).subscribe(res => {
        res.forEach((element, index) => {
          this.service.getNote(id, element.name).subscribe(resp => {
            this.collections.push({ name: element.name, active: false });
          });
        });
      });
    });
  }
  
  swipe(event) {
    if (event.direction === 2) {
      this.navCtrl.parent.select(1);
    }
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

  addMemo() {
    this.storage.setMemo(true);
    this.navCtrl.parent.select(1);
  }

  addNote() {
    this.storage.setNote(true);
    this.navCtrl.parent.select(2);
  }
}
