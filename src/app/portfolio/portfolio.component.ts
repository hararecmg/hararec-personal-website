import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data => {
      this.title.setTitle(`hararec - ${data['title']} 💼`);
    });
  }

}
