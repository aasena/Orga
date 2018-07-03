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

  collections;
  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public service: AuthService,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.param = this.params.get("note");
    this.collections = this.params.get("coll");
    this.title = this.param.title;
    this.note = this.param.note;
    this.collection = this.param.collection;
  }

  editNote() {
      console.log()
    this.service.noteEdit(
      this.param.id_user,
      this.param.id_note,
      this.note,
      this.title,
      this.collection,
      this.new,
      this.newCollection
    ).subscribe(res => {
        let alert = this.alertCtrl.create({
            title: res.title,
            subTitle: res.sub,
            buttons: ["OK"]
        });
        alert.present();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
