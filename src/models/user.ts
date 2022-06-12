import { UserRole } from './enums';
import { Address } from './address';

export interface User {
    id?: number,
    first_name: string,
    last_name: string,
    birth_date: Date,
    email?: string,
    phone_number: string,
    national_registry_number?: string,
    password?: string,
    active: boolean,
    addresses: Address[]
}

export interface Customer extends User{
    customer_type: number
}

export interface Employee extends User{
    roles: UserRole[]
    hire_date: Date,
    salary : number
}