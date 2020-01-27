// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// /*
//   Generated class for the ProcessHttpmsgProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class ProcessHttpmsgProvider {

//   constructor(public http: HttpClient) {
//     console.log('Hello ProcessHttpmsgProvider Provider');
//   }

// }

// deprecated http module used in lessons, new module is HttpClient, got solution from forums below
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Http, Response } from '@angular/http';
// import 'rxjs/add/observable/throw';

// /*
//   Generated class for the ProcessHttpmsgProvider provider.
//   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
//   for more info on providers and Angular 2 DI.
// */
// @Injectable()
// export class ProcessHttpmsgProvider {

//   constructor(public http: Http) {
//     console.log('Hello ProcessHttpmsgProvider Provider');
//   }

//   public extractData(res: Response) {
//     let body = res.json();
//     return body || { };
//   }

//   public handleError (error: Response | any) {
//     // In a real world app, you might use a remote logging infrastructure
//     let errMsg: string;
//     if (error instanceof Response) {
//       const body = error.json() || '';
//       const err = body.error || JSON.stringify(body);
//       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//     } else {
//       errMsg = error.message ? error.message : error.toString();
//     }
//     console.error(errMsg);
//     return Observable.throw(errMsg);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Response } from '@angular/http';

import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw';

/*
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }

  public extractData(res: Response) {
  	let body = res;
  	return body || {};
  }

  public handleError(error: HttpErrorResponse | any) {
  	let errMsg: string;

  	if(error.error instanceof ErrorEvent) {
  		errMsg = error.error.message;
  	}else {
  		errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
  	}

  	console.error(errMsg);
  	return Observable.throw(errMsg);
  }

}
