import { Address } from "./address";
import { ServiceType } from './enums';


export interface Contract {
    id: number,
    user_id: number,
    start_date: Date,
    end_date: Date,
    estimation_id: number,
    address: Address,
    tariff: Tariff,
    status: number,
}

export interface Tariff {
    customer_type: number,
    service_type: ServiceType,
    value: number,
}

export enum CONTRACT_STATUS {
    NOT_VALIDATED = 1,
    ACTIVE,
    EXPIRED,
}
