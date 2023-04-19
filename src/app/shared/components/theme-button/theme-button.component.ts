import { ThemeService } from './../../services/global/theme.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss']
})
export class ThemeButtonComponent implements OnInit {

  @Input('customClass') customClass: string = '';
  isChecked: boolean = false;
  themeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.isChecked = this.themeService.theme !== 'dark'
    this.themeForm = this.fb.group({
      checked: this.isChecked,
    });
  }

  changeTheme() {
    this.isChecked = this.themeForm.controls['checked'].value
    this.themeService.toggleTheme(); 
  }

   get themeName(): string {
    return this.isChecked ? 'light' : 'dark';
   }

}
