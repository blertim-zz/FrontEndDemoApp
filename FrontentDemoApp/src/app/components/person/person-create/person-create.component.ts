import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../../company/models/company.model';
import { Person } from '../models/person.model';
import { LocalStoreManager } from '../../../services/local-store-manager.service';
import { UtilService } from 'src/app/services/util.service';



@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {

  companies: [Company];
  constructor(private router: Router,
              private localStorageManager: LocalStoreManager, private utilService: UtilService) { }

  ngOnInit() {
      this.companies = this.localStorageManager.getCompanies();
   }

  save(form: NgForm) {
      if (form.valid) {

          const personi: Person = {
              id: this.utilService.guid(),
              name: form.value.name,
              companyId: form.value.company
          };

          this.localStorageManager.addPersoni(personi);

          if(personi.companyId === '') {
            this.router.navigate(['persons/non-associated/list']);
          } else {
            this.router.navigate(['persons/associated/list']);
          }          
      }
  }

  cancel() {
      this.router.navigate(['persons/associated/list']);
  }
}
