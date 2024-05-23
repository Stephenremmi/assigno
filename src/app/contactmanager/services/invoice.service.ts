import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface Invoice {
  id: number;
  invoiceNumber: string;
  item: string;
  creationDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  balance: number;
  status: string;
  schoolId: number;
  daysUntilDue: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  private _invoices = new BehaviorSubject<Invoice[]>([]);
  private dataStore: { invoices: Invoice[] } = { invoices: [] };

  http = inject(HttpClient);

  get invoices(): Observable<Invoice[]> {
    return this._invoices.asObservable();
  }

  addInvoice(invoice: Invoice): Invoice {
    invoice.id = this.dataStore.invoices.length + 1;
    invoice.invoiceNumber = `INV-${invoice.id.toString().padStart(3, '0')}`;
    this.dataStore.invoices.push(invoice);
    this._invoices.next(this.dataStore.invoices);
    return invoice;
  }

  loadAll() {
    const invoicesUrl = '/assets/invoices.json';
    return this.http.get<Invoice[]>(invoicesUrl)
      .subscribe({
        next: data => {
          this.dataStore.invoices = data;
          this._invoices.next(this.dataStore.invoices);
        },
        error: error => console.log("Failed to fetch invoices", error)
      });
  }

  invoiceById(id: number): Invoice | undefined {
    return this.dataStore.invoices.find(x => x.id === id);
  }
}