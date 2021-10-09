import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FETCH_SPACEX_DATA } from '../constants/apis.constant';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandler
  ) {}

  fetchSpaceXData(
    launchYear: number,
    successfulLaunch: boolean,
    successfulLand: boolean
  ) {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('launch_year', launchYear);
    params = params.append('launch_success', successfulLaunch);
    params = params.append('land_success', successfulLand);

    return this.httpClient.get(
      `${environment.serverConfig.apiUrl}${FETCH_SPACEX_DATA}`,
      { params: params }
    );
    // .pipe(catchError(this.errorHandler.handleError));
  }
}
// generalErrorHandler(error: any, caught: Observable<any>): Observable<any> {
//   console.log('error caught: ', error);
//   if( error.error.status == "INVALID_TOKEN" || error.error.status == "MAX_TOKEN_ISSUE_REACHED"){
//     console.log('token has expired');
//     this.logout();
//     return error;
//   }
//   return error;
// }
