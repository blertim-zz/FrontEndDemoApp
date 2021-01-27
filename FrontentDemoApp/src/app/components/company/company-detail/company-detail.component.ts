import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStoreManager } from '../../../services/local-store-manager.service';
import { Company } from '../models/company.model';
import { Person } from '../../person/models/person.model';

@Component({
    selector: 'app-company-detail',
    templateUrl: 'company-detail.component.html',
    styleUrls: ['company-detail.component.scss']
})

export class CompanyDetailComponent implements OnInit {

    company: Company;
    companyPerson: [Person];
    constructor(private router: Router, private route: ActivatedRoute,
                private localStorageManager: LocalStoreManager) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const companyId = params.id;
            this.company = this.localStorageManager.getCompanyById(companyId);
            this.companyPerson = this.localStorageManager.getPersoniByCompanyId(companyId);
        });
    }

    deletePerson(person: Person) {
        person.companyId = '';
        this.localStorageManager.updatePersoni(person);
        const index = this.companyPerson.findIndex((item: Person) => item.id === person.id);
        if (index >= 0) {
            this.companyPerson.splice(index, 1);
        }
    }

    back() {
        this.router.navigate(['companies']);
    }
}
