import { Meter } from "./estimation";

export interface Consumption {
    read_date: Date,
    start_date: Date,
    meters: Meter[]
}

export interface ContractMeters {
    id: number,
    meters: Meter[]
}