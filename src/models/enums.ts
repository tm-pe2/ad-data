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

export enum CONTRACT_STATUS {
    NOT_VALIDATED = 1,
    ACTIVE,
    EXPIRED,
}

export enum PlanningStatus
{
    SCHEDULED = 1,
    DONE = 2
}

export enum INVOICE_TYPE {
    ADVANCE = 1,
    DEBIT,
    CREDIT,
}

export enum INVOICE_STATUS {
    DUE = 1,
    LATE,
    PAID,
}

export enum CustomerType
{
    PRIVATE = 1,
    COMPANY = 2
}

export enum MeterType {
    MANUAL = "Manual",
    SMART = "Smart",
}

export enum BuildingType {
    APARTMENT = 0,
    CLOSED = 1,
    SEMI_DETACHED = 2,
    OPEN = 3,
}

export enum ServiceType {
    ELECTRICITY = 1,
    GAS = 2,
}

export enum EquipmentType {
    OVEN_STOVE = 1,
    DISHWATER = 2,
    WASHING_MACHINE = 3,
    DRYING_MACHINE = 4,
    HAIR_DRYER = 5,
}