import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface Collection {
  id: number;
  invoiceNumber: string;
  collectionNumber: string;
  date: string;
  status: string;
  amount: number;
  schoolId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CollectionService {

  private _collections = new BehaviorSubject<Collection[]>([]);
  private dataStore: { collections: Collection[] } = { collections: [] };

  http = inject(HttpClient);

  get collections(): Observable<Collection[]> {
    return this._collections.asObservable();
  }

  addCollection(collection: Collection): Collection {
    collection.id = this.dataStore.collections.length + 1;
    collection.collectionNumber = `COL-${collection.id.toString().padStart(3, '0')}`;
    this.dataStore.collections.push(collection);
    this._collections.next(this.dataStore.collections);
    return collection;
  }

  loadAll() {
    const collectionsUrl = '/assets/collections.json';
    return this.http.get<Collection[]>(collectionsUrl)
      .subscribe({
        next: data => {
          this.dataStore.collections = data;
          this._collections.next(this.dataStore.collections);
        },
        error: error => console.log("Failed to fetch collections", error)
      });
  }

  collectionById(id: number): Collection | undefined {
    return this.dataStore.collections.find(x => x.id === id);
  }
}