import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
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
  userDevice!: Device;

  constructor(
    private device: DeviceService,
    private config: DynamicDialogConfig,
  ) {
    this._openAiResponse = this.config.data.openAiResp;
  }
  
  ngOnInit(): void {
    this.userDevice = this.device.device;
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
      duration: 2.5,
      text: this.openAiResponse['text'].replace(/\/(.*)\//g, ''),
      delay: 1,
      onComplete: function () { tl.play() },
    });
    masterTl.add(wordTl);
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
          ? '70%'
          : this.userDevice.isWeb
            ? '70%'
            : '100%',
    }
  }
  
  get openAiResponse(): {[key: string]: string} {

    const date = this.formatUnixTime(this._openAiResponse.created);
    const model = this._openAiResponse.model;

    return {
      'text': this._openAiResponse.choices[0].text || 'hello world',
      'quote': `Texto creado por '${model}' (IA) - ${date}` || '',
      'id': this._openAiResponse.id,
    }
  }

}
