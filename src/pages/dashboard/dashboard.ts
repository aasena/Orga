import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarTab } from './calendar/calendar';
import { ClipboardTab } from './clipboard/clipboard';
import { EventTab } from './event/event';
import { TodoTab } from './todo/todo';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  calendar = CalendarTab;
  clipboard = ClipboardTab;
  event = EventTab;
  todo = TodoTab;


  constructor(public navCtrl: NavController) {}

}
