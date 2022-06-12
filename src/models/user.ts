export interface User {
    id?: number,
    first_name: string,
    last_name: string,
    birth_date: Date,
    email?: string,
    phone_number: string,
    national_registry_number?: string,
    password?: string,
    active: boolean
}

export enum UserRole {
    customer = 1,
    supplier = 2,
    employee = 3,
    accountant = 4,
    technician = 5,
    support = 6,
    manager = 7,
    hr_manager = 8,
    admin = 9,
}