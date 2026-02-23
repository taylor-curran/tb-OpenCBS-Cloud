import { of as observableOf, Subject } from 'rxjs';

import { catchError, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TopUpService {
  private topUpFormStatus = new Subject<any>();
  private formSubmitTopUpSource = new Subject<any>();
  topUpFormStatusChanged$ = this.topUpFormStatus.asObservable();
  formSubmitTopUpSourceChange$ = this.formSubmitTopUpSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  announceFormStatusChange(bool: boolean) {
    this.topUpFormStatus.next(bool);
  }

  formSubmitTopUpStatusChange(bool: boolean) {
    this.formSubmitTopUpSource.next(bool);
  }

  topUpLoan(loanId, data) {
    return this.httpClient.post<any>(`${environment.API_ENDPOINT}loans/${loanId}/top-up`,
      JSON.stringify(data))
      .pipe(delay(environment.RESPONSE_DELAY),
        catchError((err: HttpErrorResponse) => {
          const errObj = {
            error: true,
            message: err.error.message
          };
          return observableOf(errObj);
        }));
  }
}
