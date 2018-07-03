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
  title: string = "";
  fullDate = {
    time: "",
    data: "",
    month: ""
  };
  param: any;

  constructor(
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

  delete() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
