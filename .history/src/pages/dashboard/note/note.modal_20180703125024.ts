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
  collection: string;
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
    this.collection = this.params.get("note")[0].collection;
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
          res.forEach((element, index) => {
            if (element.name == this.collection) {
              this.service.getNote(id, element.name).subscribe(resp => {
                  console.log("true")
                  console.log(resp)
                  this.param = resp;
                  console.log(this.param)
              })
            }
          })
        });
      });
    });
  }

  delete(item) {
    console.log(item)
    this.service.noteDelete(item.id_user, item.id_note, item.collection).subscribe(res => {
      const confirm = this.alertCtrl.create({
        title: res.title,
        message: res.sub,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              console.log('Disagree clicked');
            }
          }
        ]
      });
      confirm.present();
      let alert = this.alertCtrl.create({
        title: res.title,
        subTitle: res.sub,
        buttons: [{
          text: 'ok',
          handler: () => {
            this.viewCtrl.dismiss()
          }
        }]
      });
      alert.present();
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  
}
