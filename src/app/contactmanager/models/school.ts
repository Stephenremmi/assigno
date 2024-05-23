export class School {
    id!: number;
    name!: string;
    type!: string;
    product!: string;
    county!: string;
    registrationDate!: string;
    contactInformation: ContactInformation = {
        phone: '',
        email: ''
    };
    balance!: number;
}

interface ContactInformation {
    phone: string;
    email: string;
}