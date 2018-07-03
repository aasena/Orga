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
        case "Gennaio": let month = '01'; break;
        case "Febbraio": let month = '02'; break;
        case "Marzo": let month = '03'; break;
        case "Aprile": let month = '04'; break;
        case "Maggio": let month = '05'; break;
        case "Giugno": let month = '07'; break;
        case "Luglio": let month = '08'; break;
        case "Agosto": let month = ''

    }
    this.data = this.memo.date_time.split(" ")[3].replace(',', '') + '-' + this.memo.date_time.split(" ")[3]
    console.log(this.memo)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
