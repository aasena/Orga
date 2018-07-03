import { Component } from "@angular/core";
import { ViewController, NavParams, Platform } from "ionic-angular";

@Component({
    templateUrl: 'memo.modal.html'
})
export class MemoModal {
  memo: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
