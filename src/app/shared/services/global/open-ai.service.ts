import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap, switchMap } from 'rxjs';
import { OpenAIRequest, OpenAIResponse, OpenAIModerationResponse } from '../../interfaces/open-ai';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor(private http: HttpClient) { }

  getModerateCompletions(body: OpenAIRequest, isModerate: boolean = false): Observable<OpenAIResponse> {

    return isModerate
      ? this.http.post<OpenAIModerationResponse>(
        `${environment.openAiBaseUrl}/v1/moderations`,
        JSON.stringify({ input: body.prompt })
      ).pipe(
        switchMap(resp => {

          let warningText = "Lamentablemente, hemos detectado que su solicitud ha violado una o más de nuestras políticas de contenido. Nos tomamos muy en serio la integridad y la ética en el uso de nuestra plataforma, por lo que le pedimos que revise y modifique su solicitud.";

          return resp.results[0].flagged
            ? of<OpenAIResponse>({
              id: resp.id,
              created: new Date().getTime(),
              model: resp.model,
              choices: [
                {
                  index: 0,
                  text: warningText
                }
              ]
            } as OpenAIResponse)
            : this.getCompletions(body)
        })
      )
      : this.getCompletions(body);
  }

  private getCompletions(body: OpenAIRequest): Observable<OpenAIResponse> {

    let localData = 'openAi?';

    Object.entries(body).forEach(item => {
      if (item[0]) {
        localData += `${item[0]}=${item[1]}&`;
      }
    })

    return localStorage.getItem(localData)
      ? of<OpenAIResponse>(JSON.parse(localStorage.getItem(localData) || ''))
      : this.http.post<OpenAIResponse>(
        `${environment.openAiBaseUrl}/v1/completions`,
        JSON.stringify(body)
      ).pipe(
        map(this.mapOpenAIResponse),
        tap(resp => localStorage.setItem(localData, JSON.stringify(resp)))
      );
  }

  private mapOpenAIResponse(response: OpenAIResponse): OpenAIResponse {
    const { id, created, model, choices } = response;
    const mappedChoices = choices.map(resp => {
      return {
        index: resp.index,
        text: resp.text
      }
    });
    return { id, created, model, choices: mappedChoices };
  }
}
