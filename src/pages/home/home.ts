import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""

  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public outh: AuthService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter() {
    this.outh.refreshToken()
      .subscribe(response => {
        this.outh.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.outh.authenticate(this.creds)
      .subscribe(response => {
        this.outh.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { })
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
