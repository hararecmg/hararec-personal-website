import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUnderDevelopmentComponent } from '../shared/components/page-under-development/page-under-development.component';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: { title: 'contact' },
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
export class ContactRoutingModule { }
