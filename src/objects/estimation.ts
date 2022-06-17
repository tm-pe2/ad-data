import { Estimation, Meter} from '../models/estimation';
import { Customer } from '../models/user';
import { BuildingType, EquipmentType, MeterType } from '../models/enums';
import fetch from 'node-fetch';

const baseUrl: string = 'http://localhost:3000/customers';
let customers: Customer[] = [];
let estimations: Estimation[] = [];

//generate random number
function getRandomInt(min:number ,max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//calculate consumption
function calculateEstimation(estimation: Estimation): number {
    let calc_estimation = 0;

    switch (estimation.family_size) {
        //daily electricity consumption in kWh of 'x' person(s) in an apartment:
        case 1:
            {
                calc_estimation += 18;
                break;
            }
        case 2:
            {
                calc_estimation += 28;
                break;
            }
        case 3:
            {
                calc_estimation += 40;
                break;
            }
        case 4:
            {
                calc_estimation += 60;
                break;
            }
        default:
            {
                // Quick fix
                calc_estimation += 80;
                break;
            }
    }

    //electricity consumption is adjusted depending on building type. e.g: closed house can get warmer easier than an open building, etc:

    switch (estimation.building_type) {
        case BuildingType.SEMI_DETACHED:
            {
                calc_estimation -= 5;
                break;
            }
        case BuildingType.CLOSED:
            {
                calc_estimation -= 2;
                break;
            }
        case BuildingType.OPEN:
            {
                calc_estimation += 5;
                break;
            }
        default: {
            break;
        }
    }

    //the amount of kWh consumed in a day from an appliance is added to the estimated consumption
    for (let i = 0; i < estimation.equipment.length; i++) {
        if (estimation.equipment[i] == EquipmentType.OVEN_STOVE) { calc_estimation += 1 }
        if (estimation.equipment[i] == EquipmentType.DISHWATER) { calc_estimation += 0.20 }
        if (estimation.equipment[i] == EquipmentType.WASHING_MACHINE) { calc_estimation += 0.36 }
        if (estimation.equipment[i] == EquipmentType.DRYING_MACHINE) { calc_estimation += 0.30 }
        if (estimation.equipment[i] == EquipmentType.HAIR_DRYER) { calc_estimation += 1.07 }
    }

    return calc_estimation*30;
}

//get customers
const getCustomers = async(url: string): Promise<Customer[]> => {
    let cus: Customer[] = [];

    try {
        const response = await fetch(url);
        cus = await response.json();
    } 
    catch (error) {
        console.log(error);
    }

    return cus;
}

//generate past_consumtion
function generatePastConsumtion(estimation: number): number {
    //anual estimation = est * 365
    let anualEstimation: number = estimation * 12;

    //generate estimation between - 10% of anual est & + 10% of est
    let estimationNumber = getRandomInt((anualEstimation - (anualEstimation * 0.1)), (anualEstimation + (anualEstimation * 0.1)));
    console.log(estimationNumber);
    return estimationNumber;
}

//generate a random meter type
function getRandomMeterType(): MeterType {
    let randomNumber = getRandomInt(1,2);

    if(randomNumber == 1){
        return MeterType.MANUAL
    }
    else {
        return MeterType.SMART
    }
}

//generate meters per address
function generateMeters(): Meter[] {
    let meters: Meter[] = [];

    for(let i = 0; i < getRandomInt(1,3); i++) {
        let tempMeter: Meter = {
            meter_type: getRandomMeterType()
        }
        meters.push(tempMeter);
    }
    
    return meters;
}

//generate estimation object
function generateEstimation(addressID: number): Estimation {
    let equipmentArray: number[] = [];
    let status: boolean = false;

    //generate random array of equipments
    for(let i = 0; i < getRandomInt(1,5); i++) {
        let tempNum = getRandomInt(1,5);
        equipmentArray.forEach(num => {
            if(tempNum == num){
                status = true
            }
        });

        if(status == false) {
            equipmentArray.push(tempNum);
        }
    }

    let estimation: Estimation = {
        past_consumption: 1,           //  will be generated later -> depends on calculated estimation
        address_id: addressID,
        family_size: getRandomInt(1,4),
        building_type: getRandomInt(1,3),
        service_type: getRandomInt(1,2),
        meters: generateMeters(),
        equipment: equipmentArray
    }

    return estimation;
}

//generate all estimations
const fillEstimationArray = async() => {
    customers = await getCustomers(baseUrl);

    for(let i = 0; i < customers.length; i++) {
        for(let j = 0; j < customers[i].addresses.length; j++) {
            let tempEstimation: Estimation = generateEstimation(Number(customers[i].addresses[j].id));
            let tempEstimationNumber = calculateEstimation(tempEstimation);
            tempEstimation.past_consumption = generatePastConsumtion(tempEstimationNumber);
            estimations.push(tempEstimation);
        }
    }
}

// add estimations to db
export const addEstimation = async () => {
    await fillEstimationArray();
    console.log("Adding estimations ...");
    for(let i = 0; i <= estimations.length; i++){
        const response = await fetch("http://localhost:3000/estimations", {
            method: 'POST',
            body: JSON.stringify(estimations[i]),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    }
    console.log("Estimations added!");
}
