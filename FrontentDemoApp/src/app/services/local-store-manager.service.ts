import { Injectable } from '@angular/core';
import { Person } from '../components/person/models/person.model';
import { StorageKeys } from './storage-keys';
import { Company } from '../components/company/models/company.model';

@Injectable()
export class LocalStoreManager {

    public gePersoni() {
        return this.getDataObjects<Person>(StorageKeys.PERSONS);
    }

    public getPersoniById(id: string) {
        const persons = this.gePersoni();
        return persons.find((person: Person) => person.id === id);
    }

    public getPersoniByCompanyId(companyId: string): [Person] {
        const persons = this.getDataObjects<Person>(StorageKeys.PERSONS);
        return persons.filter((item: Person) => item.companyId === companyId) as [Person];
    }

    public addPersoni(person: Person) {
        const persons = this.getDataObjects<Person>(StorageKeys.PERSONS);
        persons.push(person);
        this.setItem(StorageKeys.PERSONS, persons);
    }

    public updatePersoni(person: Person) {
        let persons = this.getDataObjects<Person>(StorageKeys.PERSONS);
        persons = persons.map((item: Person) => item.id === person.id ? person : item) as [Person];
        this.setItem(StorageKeys.PERSONS, persons);
    }

    public deletePerson(person: Person) {
        const persons = this.getDataObjects<Person>(StorageKeys.PERSONS);
        const index = persons.findIndex((item: Person) => item.id === person.id);
        if (index >= 0) {
            persons.splice(index, 1);
        }
        this.setItem(StorageKeys.PERSONS, persons);
    }

    public getCompanies() {
        return this.getDataObjects<Company>(StorageKeys.COMPANIES);
    }

    public getCompanyById(id: string) {
        const companies = this.getCompanies();
        return companies.find((company: Company) => company.id === id);
    }

    public addCompany(company: Company) {
        const companies = this.getDataObjects<Company>(StorageKeys.COMPANIES);
        companies.push(company);
        this.setItem(StorageKeys.COMPANIES, companies);
    }

    public updateCompany(company: Company) {
        let companies = this.getDataObjects<Company>(StorageKeys.COMPANIES);
        companies = companies.map((item: Company) => item.id === company.id ? company : item) as [Company];
        this.setItem(StorageKeys.COMPANIES, companies);
    }

    public deleteCompany(company: Company) {
        const companies = this.getDataObjects<Company>(StorageKeys.COMPANIES);
        const index = companies.findIndex((item: Company) => item.id === company.id);
        if (index >= 0) {
            companies.splice(index, 1);
        }
        this.setItem(StorageKeys.COMPANIES, companies);

        let persons = this.gePersoni();
        persons = persons.map((item) => {
            if (item.companyId === company.id) { item.companyId = ''; }
            return item;
        }) as [Person];
        this.setItem(StorageKeys.PERSONS, persons);
    }

    public getData(key: string) {
        return this.getItem(key);
    }

    private setItem(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    private getItem(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    private getDataObjects<T>(key: string): [T] {

        let data: T[] = this.getData(key);

        if (data === null) {
            data = [] as T[];
        }
        return data as [T];
    }
}
