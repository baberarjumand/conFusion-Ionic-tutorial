import { LeaderProvider } from './../../providers/leader/leader';
import { Leader } from './../../shared/leader';
import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  leaders: Leader[];
  errMess: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private leaderService: LeaderProvider,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(leaders => this.leaders = leaders, errmess => this.errMess = <any>errmess)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
