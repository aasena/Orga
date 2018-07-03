import { Component } from "@angular/core";
import {
  ViewController,
  NavParams,
  AlertController,
  ModalController
} from "ionic-angular";
import { AuthService } from "../../../providers/auth/auth-service";
import { EditNoteModal } from "./editNote.modal";


@Component({
  templateUrl: "note.modal.html"
})
export class NoteModal {
  param: any;

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

  edit(item) {
    let editNoteModal = this.modalCtrl.create(EditNoteModal, { note: item, coll: this.params.get("coll")});

    editNoteModal.present();
  }

  delete(item) {
    console.log(item)
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
