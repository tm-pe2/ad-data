import { Address } from "./address";
import { BuildingType, ServiceType, EquipmentType, MeterType } from './enums';

export interface Estimation {
    past_consumption?: number;
    address_id?: number;
    family_size: number,
    building_type: BuildingType,
    service_type: ServiceType,
    meters: Meter[],
    equipment: EquipmentType[],
}

export interface Meter {
    id?: number,
    physical_id?: number,
    meter_type: MeterType,
    index_value?: number
}
