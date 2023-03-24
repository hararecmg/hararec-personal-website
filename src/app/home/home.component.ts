import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data => {
      this.title.setTitle(`hararec - ${data['title']} 🏠`);
    });
  }


}
