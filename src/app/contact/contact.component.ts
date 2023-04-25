import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data => {
      this.title.setTitle(`hararec - ${data['title']} 📞`);
    });
  }

}
