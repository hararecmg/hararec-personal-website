import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, timer, take, Subscription, finalize, filter, map, switchMap } from 'rxjs';
import { OpenAiService } from './open-ai.service';
import { TypingTextComponent } from '../../components/typing-text/typing-text.component';
import { environment } from 'src/environments/environment.development';
import { OpenAIResponse } from '../../interfaces/open-ai';

@Injectable({
  providedIn: 'root',
  deps: [DialogService]
})
export class TypingTextModalService {

  private _modalSubject = new Subject<OpenAIResponse>();

  constructor(
    private router: Router,
    private openAi: OpenAiService,
    private dialogService: DialogService,
  ) {
    this.router.events
      .pipe(
        filter(event => {
          return event instanceof NavigationEnd
            ? event.url !== '/' && event.url !== '/home'
              ? true
              : false
            : false;
        }),
        map(path => this.convertPathToPrompt((path as NavigationEnd).url)),
        switchMap(prompt => this.openAi.getModerateCompletions({
          model: 'text-davinci-003',
          prompt,
          temperature: 0.9,
          max_tokens: 60,
          frequency_penalty: 0,
          presence_penalty: 0,
          top_p: 1,
        }))
      )
      .subscribe(resp => {
        if (resp.choices.length) {
          this._modalSubject.next(resp);
        }
      });
  }

  private convertPathToPrompt(path: string): string {
    const urlArray = path.split('/');
    const queryText = urlArray
      .filter((valor, indice) => urlArray.indexOf(valor) === indice)
      .slice(1).join(' ');

    return `Reflexiona sobre la naturaleza de: "${queryText}" y escribe una frase filosófica sobre ello:`;
  }

  open(openAiResp: OpenAIResponse) {

    const ref: DynamicDialogRef = this.dialogService.open(TypingTextComponent, {
      header: '¡Inspírate con esta frase filosófica!, esperamos que te guste 🤗',
      data: { openAiResp },
      draggable: false,
      baseZIndex: 10000,
      resizable: false,
    });

    const timerSubs: Subscription = timer(Number(environment.modalIsDysplayed) * 1000)
      .pipe(
        take(1),
        finalize(() => timerSubs.unsubscribe())
      ).subscribe(() => {
        if (ref) {
          ref.close();
          ref.destroy();
        }
      });

    const closeSubs: Subscription = ref.onClose
      .pipe(
        take(1),
        finalize(() => closeSubs.unsubscribe())
      ).subscribe(() => {
        if (ref) {
          ref.close();
          ref.destroy();
        }
      });
  }

  get modalObserver$(): Subject<OpenAIResponse> {
    return this._modalSubject;
  }
}
