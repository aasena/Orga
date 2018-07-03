import { Component } from "@angular/core";
import { ViewController, NavParams, Platform, AlertController } from "ionic-angular";
import { AuthService } from "../../../providers/auth/auth-service";

@Component({
  templateUrl: "memo.modal.html"
})
export class MemoModal {
  title: string;
  fullDate = {
    time: "",
    data: "",
    month: ""
  };
  param: any;

  constructor(
    public alertCtrl: AlertController,
    public service: AuthService,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.param = this.params.get("memo");
    console.log(this.param);
    switch (this.param.date_time.split(" ")[2]) {
      case "Gennaio":
        this.fullDate.month = "01";
        break;
      case "Febbraio":
        this.fullDate.month = "02";
        break;
      case "Marzo":
        this.fullDate.month = "03";
        break;
      case "Aprile":
        this.fullDate.month = "04";
        break;
      case "Maggio":
        this.fullDate.month = "05";
        break;
      case "Giugno":
        this.fullDate.month = "06";
        break;
      case "Luglio":
        this.fullDate.month = "07";
        break;
      case "Agosto":
        this.fullDate.month = "08";
        break;
      case "Settembre":
        this.fullDate.month = "09";
        break;
      case "Ottobre":
        this.fullDate.month = "10";
        break;
      case "Novembre":
        this.fullDate.month = "11";
        break;
      case "Dicembre":
        this.fullDate.month = "12";
        break;
    }
    this.fullDate.data =
      this.param.date_time.split(' ')[3].replace(",", "") +
      "-" +
      this.fullDate.month +
      "-" +
      this.param.date_time.split(' ')[1];
    this.fullDate.time = this.param.date_time.split(' ')[4];
    this.title = this.param.title;
  }

  edit() {
    this.service.memoEdit(
      this.param.id_user,
      this.param.id_memo,
      this.title,
      this.fullDate.data,
      this.fullDate.time
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
    this.param = {
      id
    }
    this.viewCtrl.dismiss(this.param);
  }
}
