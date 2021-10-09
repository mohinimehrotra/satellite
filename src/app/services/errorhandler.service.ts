import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandler {
  constructor() {}

  handleError(error: {
    hasOwnProperty: (arg0: string) => any;
    error: {
      hasOwnProperty: (arg0: string) => any;
      error: string | any[];
      message: any;
    };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.hasOwnProperty('error')) {
      // client-side error
      if (error.error.hasOwnProperty('error')) {
        if (error.error.error.length !== 0) {
          errorMessage = `Error: ${JSON.stringify(error.error.error[0].msg)}`;
        } else {
          errorMessage = `Error: ${error.error.message}`;
        }
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(new Date() + '- ', errorMessage);
    return throwError(errorMessage);
  }
}
