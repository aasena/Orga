import { Component } from "@angular/core";
import {
  ViewController,
  NavParams,
  AlertController,
  ModalController
} from "ionic-angular";
import { AuthService } from "../../../providers/auth/auth-service";
import { AuthStorage } from "../../../providers/auth/auth-storage";
import { EditNoteModal } from "./editNote.modal";


@Component({
  templateUrl: "note.modal.html"
})
export class NoteModal {
  param: any;
  profile: string;
  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public service: AuthService,
    public params: NavParams,
    public viewCtrl: ViewController,
    public storage: AuthStorage,
  ) {
    this.param = this.params.get("note");
    this.profile = this.storage.getProfile();
    console.log(this.param)
  }

  edit(item) {
    let editNoteModal = this.modalCtrl.create(EditNoteModal, { note: item, coll: this.params.get("coll")});

    editNoteModal.present();
    editNoteModal.onWillDismiss(data => {
      let id;
      this.service.id(this.profile).subscribe(response => {
        id = response.data.user;
  
        this.service.getCollection(id).subscribe(res => {
          console.log(res)
          this.param = [];
          res.forEach((element, index) => {
            this.service.getNote(id, element.name).subscribe(resp => {
              console.log(resp)
            })
          })
        });
      });
    };
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
