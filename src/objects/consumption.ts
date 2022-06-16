import { Consumption, ContractMeters, IndexedValues } from '../models/consumption';
import { faker } from '@faker-js/faker';
import fetch from 'node-fetch';
import { getNonActiveContracts } from '../services/contract'
import { getAllIndexedValues, getMeterById } from '../services/consumption';
import { Meter } from '../models/estimation';

let contracts: ContractMeters[] = [];
let firstConsumptions: Consumption[] = [];
let indexedValues: IndexedValues[] = [];
let numberOfConsumptionToGenerate: number[] = [];
function getRandomInt(min:number ,max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//get all non-active coontracts and its meters
const getContracts = async () => {
    contracts = await getNonActiveContracts();
}

//get the difference of years
function getYearDiff(startDate: Date): number {
    let endDate: Date = new Date();
    let consumptionsToGenerate: number = 0;
    let currentYear = endDate.getFullYear();
    let startYear = startDate.getFullYear();

    while(startYear < currentYear) {
        consumptionsToGenerate++;
        startYear++;
    }

    return consumptionsToGenerate;
}

//get missing consumptions
const getMissingConsumptions = async (): Promise<Consumption[]> => {
    let consumptions: Consumption[] = [];
    let currentDate: Date = new Date();
    indexedValues = await getAllIndexedValues();
    let counter = 0;

    for(let i = 0; i < indexedValues.length; i++) {
        let startIndexValue: number = indexedValues[i].index_value;
        let startDate: Date = new Date(indexedValues[i].read_date);

        //generate consumption
        // meter id should be the same
        // index values > previus
        // read date.year > prevoius read date.year

        startIndexValue += getRandomInt(300, 1500);
        let meterToAdd: Meter[] = [];
        let meter: Meter[] = await getMeterById(indexedValues[i].meter_id);
        meter[0].index_value = startIndexValue;
        meterToAdd.push(meter[0]);
        if(startDate.getFullYear() < currentDate.getFullYear())
        {
            startDate.setFullYear(indexedValues[i].read_date.getFullYear() + 1)
        }
        
        let tmpConsumption: Consumption = {
            meters: meterToAdd,
            read_date: new Date(startDate),
            start_date: new Date(startDate)
        }
        consumptions.push(tmpConsumption);
        counter += 1;
    }

    return consumptions;
}

//generate physica id for existing meters
function generatePhysicalID() {
    let meterPhysicalID: string = '';
    let letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for(let i = 0; i < 5; i++){
        meterPhysicalID += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    meterPhysicalID+= '-' + getRandomInt(10000,99999);
    console.log(meterPhysicalID);
}

//generate read date
function generateDate(): Date {
    return faker.date.birthdate({min: 0, max: 10, mode: 'age'});;
}

//fill array with generated data
const fillConsumptionArray = async () => {
    await getContracts();
    contracts.forEach(contract => {
        let tmpDate: Date = generateDate();
        contract.meters.forEach(meter => {
            meter.index_value = getRandomInt(0,99999);
        });

        let tempCons: Consumption = {
            start_date: tmpDate,
            read_date: tmpDate,
            meters: contract.meters
        }
        firstConsumptions.push(tempCons);
    });
}

//fill in first meter readings and activate contract
export const addFirstIndexedValues = async () => {
    await fillConsumptionArray();
    console.log("Adding first readings ...\nActivating contracts ...")
    for(let i = 0; i < firstConsumptions.length; i++){
        const response = await fetch("http://localhost:3000/consumptions", {
            method: 'POST',
            body: JSON.stringify(firstConsumptions[i]),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    }
    console.log("First reading added!\nContracts activated!");
}

//add consumtions from start_date up until now
export const addMissingConsumptions = async () => {
    const consumptions: Consumption[] = await getMissingConsumptions();
    console.log("Adding missing indexed values ...")
    for(let i = 0; i < consumptions.length; i++) {
        const response = await fetch("http://localhost:3000/consumptions", {
            method: 'POST',
            body: JSON.stringify(consumptions[i]),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    }
    console.log("Missing index values added!");
}