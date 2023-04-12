import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUnderDevelopmentComponent } from '../shared/components/page-under-development/page-under-development.component';

const routes: Routes = [
  {
    path: '',
    component: PageUnderDevelopmentComponent,
    data: { title: 'portfolio' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
