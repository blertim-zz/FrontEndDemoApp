import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { Router } from '@angular/router';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

    companies: [Company];
    filteredCompanies: [Company];
    searchQuery = '';
    constructor(private localStorageManager: LocalStoreManager, private router: Router) {
    }

    ngOnInit(): void {
        this.companies = this.localStorageManager.getCompanies();
        this.filteredCompanies = this.companies;
    }

    search() {
        this.filteredCompanies = this.companies.filter((item: Company) => {
            return item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
        }) as [Company];
    }

    addCompany() {
        this.router.navigate(['/companies/create']);
    }

    editCompany(company: Company) {
        this.router.navigate([`/companies/${company.id}/edit`]);
    }

    deleteCompany(company: Company) {
        this.localStorageManager.deleteCompany(company);
        const index = this.companies.findIndex((item: Company) => item.id === company.id);
        if (index >= 0) {
            this.companies.splice(index, 1);
        }
        this.search();
    }
}
