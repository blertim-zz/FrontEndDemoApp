import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyCreateComponent } from './components/company/company-create/company-create.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyDetailComponent } from './components/company/company-detail/company-detail.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { PersonEditComponent } from './components/person/person-edit/person-edit.component';
import { CompanyEditComponent } from './components/company/company-edit/company-edit.component';

import { LocalStoreManager } from './services/local-store-manager.service';
import { StorageKeys } from './services/storage-keys';
import { UtilService } from './services/util.service';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { NotFoundComponent } from './components/not-found/not-found/not-found.component';
 

@NgModule({
  declarations: [
    AppComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    PersonCreateComponent,
    PersonListComponent,
    PersonEditComponent,
    CompanyEditComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [
    LocalStoreManager,
    StorageKeys,
    UtilService,
   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
