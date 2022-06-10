import { ICityPostCode } from '../models/address';
import * as fs from "fs";
import * as path from "path";

const cities: ICityPostCode[] = [];
const filePath = path.resolve(__dirname, '../env/belgian-cities.csv');
const data = fs.readFileSync(filePath, { encoding: 'utf-8' }).split('\n');

function parseCities() {
    
    for(let i = 0; i < data.length; i++)
    {
        const row = data[i].split(',');
        const tempCity: ICityPostCode = {
            postal_code: row[0],
            city_name: row[1]
        }
        cities.push(tempCity);
    }
}


export const addAddresses = async () => { 
    parseCities();
    console.log(cities);
    //do call to api
}