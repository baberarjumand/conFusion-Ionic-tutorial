// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// /*
//   Generated class for the DishProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class DishProvider {

//   constructor(public http: HttpClient) {
//     console.log('Hello DishProvider Provider');
//   }

// }

// deprecated http module used in lessons, new module is HttpClient, got solution from forums below
// import { Injectable } from '@angular/core';
// import { Dish } from '../../shared/dish';
// import { Observable } from 'rxjs/Observable';
// import { Http, Response } from '@angular/http';
// import { baseURL } from '../../shared/baseurl';
// import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/operator/catch';

// /*
//   Generated class for the DishProvider provider.
//   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
//   for more info on providers and Angular 2 DI.
// */
// @Injectable()
// export class DishProvider {

//   constructor(public http: Http,
//               private processHTTPMsgService: ProcessHttpmsgProvider) { }

//   getDishes(): Observable<Dish[]> {
//     return this.http.get(baseURL + 'dishes')
//                     .map(res => { return this.processHTTPMsgService.extractData(res); })
//                     .catch(error => { return this.processHTTPMsgService.handleError(error); });
//   }

//   getDish(id: number): Observable<Dish> {
//     return  this.http.get(baseURL + 'dishes/'+ id)
//                     .map(res => { return this.processHTTPMsgService.extractData(res); })
//                     .catch(error => { return this.processHTTPMsgService.handleError(error); });
//   }

//   getFeaturedDish(): Observable<Dish> {
//     return this.http.get(baseURL + 'dishes?featured=true')
//                     .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
//                     .catch(error => { return this.processHTTPMsgService.handleError(error); });
//   }

// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Dish } from '../../shared/dish';

import { map, catchError } from 'rxjs/operators';


/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: HttpClient, private processHttpmsgService: ProcessHttpmsgProvider ) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[] | any> {
  	return this.http.get(baseURL + 'dishes')
  	.pipe(catchError(this.processHttpmsgService.handleError));
  }

  getDish(id: number): Observable<Dish | any> {
  	return this.http.get<Dish>(baseURL + 'dishes/' + id)
  	.pipe(catchError(this.processHttpmsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish | any> {
  	return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
  	.pipe(map(res => res[0] ))
  	.pipe(catchError(this.processHttpmsgService.handleError));
  }

}
