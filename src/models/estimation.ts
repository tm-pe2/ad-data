import { Address } from "./address";
import { BuildingType, ServiceType, EquipmentType, MeterType } from './enums';

export interface Estimation {
    id: number;
    past_consumption: number;
    estimated_consumption: number;
    address: Address
}

export interface EstimationRegistration {
    past_consumption: number;
    address_id: number;
    family_size: number,
    building_type: BuildingType,
    service_type: ServiceType,
    meters: Meter[],
    equipment: EquipmentType[],
}

interface Meter {
    id?: number,
    physical_id?: number,
    meter_type: MeterType, // TODO: Specify type
    value: number,
}
