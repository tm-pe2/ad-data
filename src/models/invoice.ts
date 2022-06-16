import { Address } from "./address";
import { CONTRACT_STATUS, INVOICE_STATUS, INVOICE_TYPE, ServiceType } from "./enums";
import { Customer } from "./user";

export interface Invoice {
    id: number,
    contract_id: number,
    supplier_id: number,
    price: number,
    tax: number,
    creation_date: Date,
    due_date: Date,
    period_start: Date,
    period_end: Date,
    status: INVOICE_STATUS,
    type: INVOICE_TYPE,
    address: Address | null,
    customer: Customer | null,
}

export interface Tariff {
    id: number,
    customer_type: number,
    service_type: ServiceType,
    value: number,
}

export interface Contract {
    id: number,
    user_id: number,
    start_date: Date,
    end_date: Date,
    estimation_id: number,
    address_id: number,
    tariff_id: number,
    status: CONTRACT_STATUS,
}

export interface MissingInvoiceContract {
    id: number,
    meter_id: number,
    index_value: number,
    read_date: Date,
    contract_id: number
}