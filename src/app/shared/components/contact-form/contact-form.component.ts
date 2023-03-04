import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormspreeService } from '../../services/global/formspree.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  status: string = "";
  myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formspree: FormspreeService
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit() {

    let text = '';

    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.formspree.submitForm(this.myForm.value)
        .pipe(tap(console.log))
        .subscribe(resp => {
          this.status = "Thanks for your submission!";
          this.myForm.reset();
        }
        );
      }

      if (!this.myForm.controls['name'].valid) {
        text += "Ingresa un nombre valid, ";
      }

      if (!this.myForm.controls['email'].valid) {
        text += "Ingresa un email valid, ";
      }

      if (!this.myForm.controls['message'].valid) {
        text += "Ingresa un mensaje, ";
      }

      this.status = text.slice(0, -2);
  }

}
