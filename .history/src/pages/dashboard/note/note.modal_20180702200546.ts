import { Component } from "@angular/core";
import {
  ViewController,
  NavParams,
  Platform,
  AlertController
} from "ionic-angular";
import { AuthService } from "../../../providers/auth/auth-service";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Component({
  templateUrl: "note.modal.html"
})
export class NoteModal {
  title: string = "";
  fullDate = {
    time: "",
    data: "",
    month: ""
  };
  param: any;

  constructor(
    public localNotifications: LocalNotifications,
    public alertCtrl: AlertController,
    public service: AuthService,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.param = this.params.get("note");
  }

  edit() {
    this.service
      .memoEdit(
        this.param.id_user,
        this.param.id_memo,
        this.title,
        this.fullDate.data,
        this.fullDate.time
      )
      .subscribe(res => {
        this.localNotifications.update({
          id: this.param.id_memo,
          text: this.title,
          sound: "file://assets/sounds/sound.mp3",
          trigger: {
            at: new Date(this.fullDate.data + " " + this.fullDate.time)
          },
          vibrate: true,
          smallIcon: "res://ic_popup_reminder",
          icon: "file://assets/icon/icon.png",
          color: "#fff"
        });

        let alert = this.alertCtrl.create({
          title: res.title,
          subTitle: res.sub,
          buttons: ["OK"]
        });
        alert.present();
      });
  }

  delete() {
    this.service.memoDelete(this.param.id_user, this.param.id_memo).subscribe(res => {
      this.localNotifications.cancel(this.param.id_memo);
      let alert = this.alertCtrl.create({
        title: res.title,
        subTitle: res.sub,
        buttons: ["OK"]
      });
      alert.present();
    });
  }

  dismiss() {
    this.param = {
      id_user: this.param.id_user,
      id_memo: this.param.id_memo,
      title: this.param.title,
      data: this.fullDate.data,
      time: this.fullDate.time
    };
    this.viewCtrl.dismiss(this.param);
  }
}
