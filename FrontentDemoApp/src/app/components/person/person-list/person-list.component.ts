import { Component, OnInit, ɵCompiler_compileModuleAsync__POST_R3__ } from '@angular/core';
import { Person } from '../models/person.model';
import { LocalStoreManager } from '../../../services/local-store-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../company/models/company.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  persons: [Person];
  filteredPersoni: [Person];
  companies: [Company];
  searchQuery = '';
  type = 'associated';
  constructor(private localStorageManager: LocalStoreManager, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
        this.type = params.type;
        this.persons = this.localStorageManager.gePersoni();
        if(this.type === 'associated') {
            this.filteredPersoni = this.persons.filter(x => x.companyId !== "") as [Person];
        } else {
            this.filteredPersoni = this.persons.filter(x => x.companyId === "") as [Person];
        }        
      });

      this.companies = this.localStorageManager.getCompanies();
  }

  companyName(companyId: string): string {
      if (companyId !== '' && companyId !== null) {
          const company = this.companies.find((item: Company) => item.id === companyId);
          if (company !== null) {
              return company.name;
          }
      }
      return 'Not associated';
  }

  search() {
      this.filteredPersoni = this.persons.filter((item: Person) => {
          return item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 
          && (this.type === 'associated' ? item.companyId !== '' : item.companyId === '');
      }) as [Person];
  }

  addPersoni() {
      this.router.navigate(['/persons/create']);
  }

  editPersoni(person: Person) {
      this.router.navigate([`/persons/${person.id}/edit`]);
  }

  deletePersoni(person: Person) {
      this.localStorageManager.deletePerson(person);
      const index = this.persons.findIndex((item: Person) => item.id === person.id);
      if (index >= 0) {
          this.persons.splice(index, 1);
      }
      this.search();
  }

}
