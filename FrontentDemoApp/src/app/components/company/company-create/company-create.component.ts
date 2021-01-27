import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LocalStoreManager } from '../../../services/local-store-manager.service';
import { UtilService } from '../../../services/util.service';
import { NgForm } from '@angular/forms';
import { Company } from '../models/company.model';

@Component({
    selector: 'app-company-create',
    templateUrl: 'company-create.component.html',
    styleUrls: ['company-create.component.scss']
})

export class CompanyCreateComponent implements OnInit {

    constructor(private router: Router,
                private localStorageManager: LocalStoreManager, private utilService: UtilService) { }

    ngOnInit() { }

    save(form: NgForm) {
        if (form.valid) {

            const company: Company = {
                id: this.utilService.guid(),
                name: form.value.name
            };

            this.localStorageManager.addCompany(company);
 
            this.router.navigate(['companies']);
        }
    }

    cancel() {
        this.router.navigate(['companies']);
    }
}
