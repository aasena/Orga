import { Component } from "@angular/core";
import { ViewController, NavParams, Platform } from "ionic-angular";

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
  
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    switch (this.params.get("memo").split(" ")[2]) {
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
      this.params.get("memo")[3].replace(",", "") +
      "-" +
      this.fullDate.month +
      "-" +
      this.params.get("memo")[1];
    this.fullDate.time = this.params.get("memo")[4];
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }
}
