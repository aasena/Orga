import { Component, OnInit, trigger, state, style, animate, transition } from "@angular/core";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import {
  AlertController,
  NavController,
  NavParams,
  ActionSheetController,
  App,
  ModalController
} from "ionic-angular";
import { AuthStorage } from "../../../providers/auth/auth-storage";
import { AuthService } from "../../../providers/auth/auth-service";
import { Home } from "../../home/home";
import { Clipboard } from "@ionic-native/clipboard";

@Component({
  selector: "page-note",
  templateUrl: "note.html",
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0'})),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class NoteTab implements OnInit {
  options: NativeTransitionOptions;
  profile: any;
  new = false;
  title: string;
  note: string;
  newCollection: string;
  collection: string;

  active = {};
  collections = [];
  notes = {};
  constructor(
    public modalCtrl: ModalController,
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

  ngOnInit() {
    let id;
    this.service.id(this.profile).subscribe(response => {
      id = response.data.user;

      this.service.getCollection(id).subscribe(res => {
        console.log(res)
        res.forEach((element, index) => {
          this.service.getNote(id, element.name).subscribe(resp => {
            this.collections.push({name: element.name, active: false})
            this.active[element.name] = false;
            this.notes[element.name] = resp;
          })
        })
        console.log(this.notes)
        console.log(this.collections)
      });
    });
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

  toggle(index, i_) {
    for(var i = 0; i< this.collections.length; i++){
      //close all other active
      this.active[this.collections[i]] = false;
      console.log("1: " + this.collections[i].active)
    }
    //expand only the clicked
    this.collections[i_].active = true;
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
    ).subscribe(res => {
      let alert = this.alertCtrl.create({
        title: res.title,
        subTitle: res.sub,
        buttons: ["OK"]
      });
      alert.present();
    });
  }
}
