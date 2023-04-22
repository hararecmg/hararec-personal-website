import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';  
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { OpenAiService } from '../../services/global/open-ai.service';
import { OpenAIResponse } from '../../interfaces/open-ai';

@Component({
  selector: 'app-typing-text',
  templateUrl: './typing-text.component.html',
  styleUrls: ['./typing-text.component.scss']
})
export class TypingTextComponent implements OnInit, AfterViewInit {

  private _openAiResponse!: OpenAIResponse;
  words: string = 'Hello world!';

  constructor(
    private openAi: OpenAiService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {

    const urlArray = this.router.url.split('/');

    this.words = urlArray
    .filter((valor, indice) => urlArray.indexOf(valor) === indice)
    .slice(1).join(' ');

    this.openAi.getModerateCompletions({
      model: 'text-davinci-003',
      prompt: this.createPromt(this.words),
      temperature: 0.9,
      max_tokens: 60,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
    }, true)
    .pipe(take(1))
    .subscribe(resp => this._openAiResponse = resp);
    
    gsap.registerPlugin(TextPlugin);
  }
  
  ngAfterViewInit(): void {
    const tl = gsap.timeline().pause();
    const masterTl = gsap.timeline();
    const wordTl = gsap.timeline({
      yoyo: true,
    });
    
    gsap.to('.cursor', {
      opacity: 0,
      ease: 'power2.inOut',
      repeat: -1,
    });
    tl.to('.box', {
      duration: 1,
      width: '18vw',
      delay: 0.2,
      ease: 'power4.inOut',
    })
    .from('.hi', {
      duration: 1,
      y: '7vw',
      ease: 'power3.inOut',
    });
    wordTl.to('.text', {
      duration: 2,
      text: this.openAiResponse['text'].replace(/\/(.*)\//g, ''),
      delay: 1.5,
      onComplete: function () { tl.play() },
    });
    masterTl.add(wordTl);
  }
  
  createPromt(words: string): string {
    return `Reflexiona sobre la naturaleza de: "${words}" y escribe una frase filosófica sobre ello:`; 
  }

  // markAasFavorite() {
  //   this.ref.close(this.openAiResponse);
  // }

  get openAiResponse(): {[key: string]: string} {

    const date = this._openAiResponse.created;
    const model = this._openAiResponse.model;

    return {
      'text': this._openAiResponse.choices[0].text || 'hello world',
      'quote': `Texto creado por ${model} (inteligencia artificial) en ${date}` || 'texto creado',
      'id': this._openAiResponse.id,
    }
  }

}
