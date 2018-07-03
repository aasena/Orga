import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthStorage } from "../../providers/auth/auth-storage";
import { HomeTab } from "./home/home";
import { MemoTab } from "./memo/memo";
import { NoteTab } from "./note/note";


/**
 * Generated class for the DashboardPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  homeRoot = HomeTab;
  memoRoot = MemoTab;
  noteRoot = NoteTab;


  constructor(public navCtrl: NavController, public storage: AuthStorage) {}

}
