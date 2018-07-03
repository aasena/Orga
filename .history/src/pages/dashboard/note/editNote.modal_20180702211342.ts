import { Component } from "@angular/core";
import {
  ViewController,
  NavParams,
  AlertController,
  ModalController
} from "ionic-angular";
import { AuthService } from "../../../providers/auth/auth-service";

@Component({
  templateUrl: "editNote.modal.html"
})
export class EditNoteModal {
  param: any;

  new = false;
  title: string;
  note: string;
  newCollection: string;
  collection: string;
  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public service: AuthService,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.param = this.params.get("note");
    console.log(this.param)
  }

  edit() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
