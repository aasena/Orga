import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { HttpClient } from "@angular/common/http";
import * as shajs from "sha.js";
import { Platform } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { AuthStorage } from "../../providers/auth/auth-storage";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {