export enum UserRole
{
    CUSTOMER = 1,
    SUPPLIER = 2,
    EMPLOYEE = 3,
    ACCOUNTANT = 4,
    TECHNICIAN = 5,
    SUPPORT = 6,
    MANAGER = 7,
    HR_MANAGER = 8,
    ADMIN = 9
}

export enum ContractStatus
{
    NOTVALID = 1,
    ACTIVE = 2,
    EXPIRED = 3,
}

export enum InvoiceType
{
    ADVANCE = 1,
    DEBIT = 2,
    CREDIT = 3
}

export enum PlanningStatus
{
    SCHEDULED = 1,
    DONE = 2
}

export enum InvoiceStatus
{
    DUE = 1,
    LATE = 2,
    PAID = 3
}

export enum CustomerType
{
    PRIVATE = 1,
    COMPANY = 2
}