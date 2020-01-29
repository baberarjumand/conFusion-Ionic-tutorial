import { Comment } from './../../shared/comment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  tempComment: Comment;
  tempDate: Date;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {
      this.commentForm = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 5,
        comment: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(this.tempComment);
  }

  onSubmit() {
    // console.log(this.commentForm.value);
    this.tempComment = this.commentForm.value;
    this.tempDate = new Date();
    this.tempComment.date = this.tempDate.toISOString();
    // console.log (this.tempComment);
    this.viewCtrl.dismiss(this.tempComment);
  }

}
