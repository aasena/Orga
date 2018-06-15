import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';

@NgModule({
  declarations: [
    Dashboard,
  ],
  imports: [
    IonicModule.forChild(Dashboard),
  ]
})
export class DashboardPageModule {}
