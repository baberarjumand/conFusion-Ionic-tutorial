import { Comment } from './../../shared/comment';
import { CommentPage } from './../comment/comment';
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  tempComment: Comment;
  modal = this.modalCtrl.create(CommentPage, this.tempComment);
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              @Inject('BaseURL') private BaseURL,
              private favoriteService: FavoriteProvider,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController ) {
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  openActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Options',
      buttons: [
        {
          text: 'Add Comment',          
          handler: () => {
            this.openCommentForm();
            console.log('Add Comment clicked');
          }
        },
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
            console.log('Add to Favorites clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCommentForm() {    
    this.modal.present();
    this.modal.onDidDismiss(tComment => {
      // console.log('From dishdetail.ts:')
      // console.log(tComment);
      this.dish.comments.push(tComment);
    });  
  }  

}