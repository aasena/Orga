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
    
  }

  delete() {
    
  }

  dismiss() {
    this.param = {
      id_user: this.param.id_user,
      id_memo: this.param.id_memo,
      title: this.param.title,
      data: this.fullDate.data,
      time: this.fullDate.time
    };
    this.viewCtrl.dismiss();
  }
}
