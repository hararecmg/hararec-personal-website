import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { OpenAIRequest, OpenAIResponse } from '../../interfaces/open-ai';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor(private http: HttpClient) { }

  getCompletions(body: OpenAIRequest): Observable<OpenAIResponse> {
    return this.http.post<OpenAIResponse>(
      `${environment.openAiBaseUrl}/v1/completions`,
      JSON.stringify(body)
    ).pipe(
      map(this.mapOpenAIResponse)
    );
  }

  private mapOpenAIResponse(response: OpenAIResponse): OpenAIResponse {
    const { id, created, model, choices } = response;
    const mappedChoices = choices.map(({ text, index }) => ({ text, index }));
    return { id, created, model, choices: mappedChoices };
  }
}
