import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: HttpClient,
              private dishService: DishProvider,
              private storage: Storage ) {
    
    console.log('Hello FavoriteProvider Provider');    
    // this.favorites = [];
    storage.get('favorites').then(favs => {
      if(favs) {
        this.favorites = favs;
      }
      else {
        console.log('No favs saved in storage found');
        this.favorites = [];
      }
    });
  }

  // addFavorite(id: number): boolean {
  //   this.favorites.push(id);
  //   return true;
  // }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    
    // update local storage
    this.storage.set('favorites', this.favorites);

      console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);

      // update local storage
      this.storage.set('favorites', this.favorites);

      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

}
