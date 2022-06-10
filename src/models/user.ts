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
    address: Address[]
}

export interface Customer extends User{
    type: number
}

export interface Employee extends User{
    hire_date: Date,
    salary : number
}