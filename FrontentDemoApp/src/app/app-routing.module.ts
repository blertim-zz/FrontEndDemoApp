import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyCreateComponent } from './components/company/company-create/company-create.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyDetailComponent } from './components/company/company-detail/company-detail.component';
import { CompanyEditComponent } from './components/company/company-edit/company-edit.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { PersonEditComponent } from './components/person/person-edit/person-edit.component';
import { NotFoundComponent } from './components/not-found/not-found/not-found.component';

const routes: Routes = [
  {path:'', redirectTo: 'companies', pathMatch: 'full'},
  {path:'companies', component: CompanyListComponent},
  {path:'companies/create', component: CompanyCreateComponent},
  {path:'companies/:id/detail', component: CompanyDetailComponent},
  {path:'companies/:id/edit', component: CompanyEditComponent},

  {path:'persons/:type/list', component: PersonListComponent},
  {path:'persons/create', component: PersonCreateComponent},
  {path:'persons/:id/edit', component: PersonEditComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
