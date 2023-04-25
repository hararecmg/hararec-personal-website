import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data => {
      this.title.setTitle(`hararec - ${data['title']} 📝`);
    });
  }

}
