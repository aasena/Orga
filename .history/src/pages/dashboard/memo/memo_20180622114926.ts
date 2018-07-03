import { Component, OnInit } from "@angular/core";
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
export class MemoTab implements OnInit {
  profile: any;
  options: NativeTransitionOptions;
  notAdd = true;
  title: string = "";
  data: any;
  time: any;
  color: any;
  memos: any;

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

  ngOnInit() {
    let id;
    this.service.memoId(this.profile).subscribe(response => {
      console.log(response)
      id = response.data.user;

      this.service.memo(id).subscribe(memos => {
        let x = memos;
        this.memos = this.memos.memos.forEach(element => {
          element.date_time = element.date_time.replace('T', ' ')
          element.date_time = element.date_time.replace(':00.000Z', '')
        });
        console.log(this.memos)
      });
    })
  }

  swipe(event) {
    if (event.direction === 2) {
      this.navCtrl.parent.select(2);
      this.options = {
        direction: "left",
        duration: 200,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    } else {
      this.navCtrl.parent.select(0);
      this.options = {
        direction: "right",
        duration: 200,
        iosdelay: 50,
        fixedPixelsBottom: 48
      };
    }
    //if (event.direction === 4) {}
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

  createAlarm() {
    let memoId, user;
    this.service.memoId(this.profile).subscribe(response => {
      memoId = response.data.memo;
      user = response.data.user;
      this.service.memoCreate(memoId, user, this.title, this.data, this.time).subscribe(res => {
        if (res.success) {
          this.localNotifications.schedule({
            id: memoId,
            text: this.title,
            sound: 'file://assets/sounds/sound.mp3',
            trigger: {at: new Date(this.data + " " + this.time)},
            vibrate: true,
            smallIcon: 'res://ic_popup_reminder',
            icon: 'file://assets/icon/icon.png',
            color: '#fff'
          });

          let alert = this.alertCtrl.create({
            title: "Congratulazioni",
            subTitle: `Promemoria creato con successo`,
            buttons: ["OK"]
          });
          alert.present();
        } else {
          let alert2 = this.alertCtrl.create({
            title: "Siamo spiacenti",
            subTitle: `Problemi momentanei con il server, riprova più tardi`,
            buttons: ["OK"]
          });
          alert2.present();
        }
      })
    });

    
  }
}
