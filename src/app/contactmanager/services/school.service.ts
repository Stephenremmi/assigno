import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface ContactInformation {
  phone: string;
  email: string;
}

interface School {
  id: number;
  name: string;
  type: string;
  product: string;
  county: string;
  registrationDate: string;
  contactInformation: ContactInformation;
  balance: number;
  invoices: number[];
  collections: number[];
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {

  private _schools = new BehaviorSubject<School[]>([]);
  private dataStore: { schools: School[] } = { schools: [] };

  http = inject(HttpClient);

  get schools(): Observable<School[]> {
    return this._schools.asObservable();
  }

  addSchool(school: School): School {
    school.id = this.dataStore.schools.length + 1;
    this.dataStore.schools.push(school);
    this._schools.next(this.dataStore.schools);
    return school;
  }

  loadAll() {
    const schoolsUrl = '/assets/schools.json';
    return this.http.get<School[]>(schoolsUrl)
      .subscribe({
        next: data => {
          this.dataStore.schools = data;
          this._schools.next(this.dataStore.schools);
        },
        error: error => console.log("Failed to fetch schools", error)
      });
  }

  schoolById(id: number): School | undefined {
    return this.dataStore.schools.find(x => x.id === id);
  }
}