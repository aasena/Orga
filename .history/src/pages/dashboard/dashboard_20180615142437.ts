import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Home } from "/home";

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
export class Dashboard {

  homeRoot = 'Home'
  memoRoot = 'Memo'
  noteRoot = 'Note'
  todoRoot = 'Todo'


  constructor(public navCtrl: NavController) {}

}
