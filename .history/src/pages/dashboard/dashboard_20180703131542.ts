import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { HomeTab } from "./home/home";
import { MemoTab } from "./memo/memo";
import { NoteTab } from "./note/note";

@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class Dashboard {
  homeRoot = HomeTab;
  memoRoot = MemoTab;
  noteRoot = NoteTab;

  constructor(public navCtrl: NavController, public storage: AuthStorage) {}
}
