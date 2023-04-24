import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUnderDevelopmentComponent } from '../shared/components/page-under-development/page-under-development.component';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: { title: 'blog' },
    children: [
      {
        path: ':blog',
        component: PageUnderDevelopmentComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
