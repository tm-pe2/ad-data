import { Consumption, ContractMeters } from '../models/consumption';
import { faker } from '@faker-js/faker';
import fetch from 'node-fetch';
import { getNonActiveContracts } from '../services/contract'

let contracts: ContractMeters[] = [];
let consumptions: Consumption[] = [];

function getRandomInt(min:number ,max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//get all non-active coontracts and its meters
const getContracts = async () => {
    contracts = await getNonActiveContracts();
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
        consumptions.push(tempCons);
    });

    consumptions.forEach(element => {
        console.log(element);
    });
}

export const addConsumption = async () => {
    await fillConsumptionArray();
    for(let i = 0; i < consumptions.length; i++){
        const response = await fetch("http://localhost:3000/consumptions", {
            method: 'POST',
            body: JSON.stringify(consumptions[i]),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        console.log(response);
    }
}