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
        case "Gennaio": 01; break;
        case "Febbraio": 02; break;
        case "Marzo": 03; break;
        case "Aprile": 04; break;
        case "Maggio": 05; break;
        case "Giugno": 07; break;
        case "Luglio": 08; break;
        
    }
    this.data = this.memo.date_time.split(" ")[3].replace(',', '') + '-' + this.memo.date_time.split(" ")[3]
    console.log(this.memo)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
