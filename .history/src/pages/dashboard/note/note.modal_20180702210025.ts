import { Component } from "@angular/core";
import {
  ViewController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthService } from "../../../providers/auth/auth-service";

@Component({
  templateUrl: "note.modal.html"
})
export class NoteModal {
  param: any;

  constructor(
    public alertCtrl: AlertController,
    public service: AuthService,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.param = this.params.get("note");
  }

  edit() {
    
  }

  delete(item) {
    this.service.noteDelete(item.id_user, item.id_note).subscribe(res => {
      let alert = this.alertCtrl.create({
        title: res.title,
        subTitle: res.sub,
        buttons: ["OK"]
      });
      alert.present();
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
