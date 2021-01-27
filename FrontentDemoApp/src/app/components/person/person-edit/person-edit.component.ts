import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../models/person.model';
import { LocalStoreManager } from '../../../services/local-store-manager.service';
import { NgForm } from '@angular/forms';
import { Company } from '../../company/models/company.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  personi: Person;
  companies: [Company];
  constructor(private route: ActivatedRoute, private localStorageManager: LocalStoreManager,
              private router: Router) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          const personiId = params.id;
          this.personi = this.localStorageManager.getPersoniById(personiId);
          if (this.personi === undefined) {
              this.router.navigate(['not-found']);
          }
          this.companies = this.localStorageManager.getCompanies();
      });
  }

  save(form: NgForm) {
      if (form.valid) {
          this.localStorageManager.updatePersoni(this.personi);
 
          if(this.personi.companyId === '') {
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
