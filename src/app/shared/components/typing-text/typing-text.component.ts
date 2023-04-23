import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';  
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { OpenAiService } from '../../services/global/open-ai.service';
import { OpenAIResponse } from '../../interfaces/open-ai';
import { DeviceService } from '../../services/global/device.service';
import { Device } from '../../interfaces/device';

@Component({
  selector: 'app-typing-text',
  templateUrl: './typing-text.component.html',
  styleUrls: ['./typing-text.component.scss']
})
export class TypingTextComponent implements OnInit, AfterViewInit {

  private _openAiResponse!: OpenAIResponse;
  words: string = 'Hello world!';
  isLoading: boolean = true;
  userDevice!: Device;

  constructor(
    private openAi: OpenAiService,
    private router: Router,
    private device: DeviceService,
  ) {}
  
  ngOnInit(): void {

    const urlArray = this.router.url.split('/');
    
    this.words = urlArray
    .filter((valor, indice) => urlArray.indexOf(valor) === indice)
    .slice(1).join(' ');

    this.userDevice = this.device.device;

    this.openAi.getModerateCompletions({
      model: 'text-davinci-003',
      prompt: this.createPromt(this.words),
      temperature: 0.9,
      max_tokens: 60,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
    }, false)
    .pipe(take(1))
    .subscribe(resp => {
      this.isLoading = false;
      this._openAiResponse = resp
    });
    
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
      width: this.cssValues['box-width'],
      delay: 0.2,
      ease: 'power4.inOut',
    })
    .from('.hi', {
      duration: 1,
      y: this.cssValues['hi-y'],
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

  formatUnixTime(unixTime: number): string {
    const date = new Date(unixTime * 1000); // se convierte a milisegundos
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} & ${hours}:${minutes}:${seconds}`;
  }

  get cssValues(): {[key: string]: string} {
    return {
      'hi-font-size': this.userDevice.isHandset
        ? '3vw'
        : this.userDevice.isTablet
          ? '1.5vw'
          : this.userDevice.isWeb || this.userDevice.isXLarge
            ? '1.2vw'
            : '1.2vw',
      'cursor-font-size': this.userDevice.isHandset
        ? '4.2vw'
        : this.userDevice.isTablet
          ? '2.2vw'
          : this.userDevice.isWeb || this.userDevice.isXLarge
            ? '1.8vw'
            : '1.8vw',
      'hi-y': this.userDevice.isHandset
        ? '12vw'
        : this.userDevice.isTablet
          ? '10vw'
          : this.userDevice.isWeb || this.userDevice.isXLarge
            ? '5vw'
            : '5vw',
      'box-width': this.userDevice.isHandset
        ? '100%'
        : this.userDevice.isTablet
          ? '62%'
          : this.userDevice.isWeb
            ? '70%'
            : '100%',
      'quote-color': this.isLoading
        ? 'transparent'
        : '',
    }
  }
  
  get openAiResponse(): {[key: string]: string} {

    const date = this.formatUnixTime(this._openAiResponse.created);
    const model = this._openAiResponse.model;

    return {
      'text': this._openAiResponse.choices[0].text || 'hello world',
      'quote': `Texto creado por '${model}' - ${date}` || '',
      'id': this._openAiResponse.id,
    }
  }

}
