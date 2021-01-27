import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-company-edit',
    templateUrl: 'company-edit.component.html',
    styleUrls: ['company-edit.component.scss']
})

export class CompanyEditComponent implements OnInit {

    company: Company;
    constructor(private route: ActivatedRoute, private localStorageManager: LocalStoreManager,
                private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const companyId = params.id;
            this.company = this.localStorageManager.getCompanyById(companyId);
            if (this.company === undefined) {
                this.router.navigate(['not-found']);
            }
        });
    }

    save(form: NgForm) {
        if (form.valid) {
            this.localStorageManager.updateCompany(this.company);
 
            this.router.navigate(['companies']);
        }
    }

    cancel() {
        this.router.navigate(['companies']);
    }
}
