import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ActionSheetController, App, ViewController } from 'ionic-angular';
import { AuthService } from "../../../providers/auth-service/auth-service";
import { Home } from '../../home/home';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarTab {

  profile: any;
  credential: any;

  constructor( public app: App, 
               public authService: AuthService, 
               public sheet: ActionSheetController,
               public alertCtrl: AlertController,) {
    this.profile = authService.getProfile();
    this.credential = authService.getCredential();
  }

  profileSettings() {
    let actionSheet = this.sheet.create({
      title: 'Modify your profile',
      buttons: [
        {
          text: 'Impostazioni',
          handler: () => {
            console.log(this.profile);
          }
        },{
          text: 'Logout',
          handler: () => {
              this.authService.doLogout().then((res) => {
              this.profile = {};
              this.credential = {};
              let nav = this.app.getRootNav().push(Home);
            }, (error) => {
              let alert = this.alertCtrl.create({
                title: 'Errore durante il logout',
                subTitle: `Si è verificato un errore durante il logout,
                          ti consigliamo di chiudere l'app.`,
                buttons: ['OK']
              });
              alert.present();
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

}
