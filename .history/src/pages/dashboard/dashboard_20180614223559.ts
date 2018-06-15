import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the DashboardPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class {

  homeRoot = 'HomePage'
  memoRoot = 'MemoPage'
  noteRoot = 'NotePage'
  todoRoot = 'TodoPage'


  constructor(public navCtrl: NavController) {}

}
