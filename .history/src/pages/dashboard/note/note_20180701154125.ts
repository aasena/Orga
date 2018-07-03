import { Component } from "@angular/core";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
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
import { Clipboard } from "@ionic-native/clipboard";

@Component({
  selector: "page-note",
  templateUrl: "note.html"
})
export class NoteTab {
  options: NativeTransitionOptions;
  profile: any;
  new = false;
  title: string;
  note: string;
  newCollection: string;
  collection: string;
  constructor(
    public clipboard: Clipboard,
    public alertCtrl: AlertController,
    public app: App,
    public service: AuthService,
    public storage: AuthStorage,
    public sheet: ActionSheetController,
    public nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.profile = storage.getProfile();
  }

  swipe(event) {
    if (event.direction === 2) {
      this.navCtrl.parent.select(3);
      this.options = {
        direction: "right",
        duration: 200,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    } else {
      this.navCtrl.parent.select(1);
      this.options = {
        direction: "left",
        duration: 200,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    }
  }

  profileSettings() {
    this.clipboard.copy("Hello world");
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

  ionViewWillLeave() {
    this.nativePageTransitions.slide(this.options);
  }

  createNote() {
    this.service.noteCreate(
      this.profile.email,
      this.title,
      this.note,
      this.new,
      this.newCollection,
      this.collection
    ).subscribe(x => {
      let alert = this.alertCtrl.create({
        title: x.title,
        subTitle: x.sub,
        buttons: ["OK"]
      });
      alert.present();
    });
  }
}
