import { Component } from "@angular/core";
import { ViewController, NavParams, Platform } from "ionic-angular";

@Component({
    templateUrl: 'memo.modal.html'
})
export class MemoModal {
  memo: any;
time: any;
data: any;
  constructor (
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.memo = this.params.get('memo');
    switch (this.memo.date_time.split(" ")[2]) {
        case "Gennaio": thi01; break;
        case "Febbraio": thi02; break;
        case "Marzo": thi03; break;
        case "Aprile": thi04; break;
        case "Maggio": thi05; break;
        case "Giugno": thi07; break;
        case "Luglio": thi08; break;

    }
    this.data = this.memo.date_time.split(" ")[3].replace(',', '') + '-' + this.memo.date_time.split(" ")[3]
    console.log(this.memo)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
