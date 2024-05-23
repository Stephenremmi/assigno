export class Invoice {
    id!: number;
    invoiceNumber!: string;
    creationDate!: Date;
    dueDate!: Date;
    amount!: number;
    paidAmount!: number;
    balance!: number;
    status!: string;
    schoolId!: number;
    daysUntilDue!: number;
}