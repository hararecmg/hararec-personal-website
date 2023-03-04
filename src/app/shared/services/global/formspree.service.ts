import { environment } from './../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormspreeRequest, FormspreeResponse } from '../../interfaces/formspree';

@Injectable({
  providedIn: 'root'
})
export class FormspreeService {

  constructor(private http: HttpClient) { }

  submitForm(data: FormspreeRequest): Observable<FormspreeResponse> {
    return this.http.post<FormspreeResponse>(
      `${environment.formspreeBaseUrl}/${environment.formspreeId}`,
      data
    );
  }
}
