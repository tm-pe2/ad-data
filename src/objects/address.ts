import { cities } from '../env/cities_postal_codes';
import { ICityPostCode } from '../models/address';
import * as database from '../utils/db';

database.init();
//querys
const queryCityPostCode: string = "INSERT INTO cities (city_name, postal_code) VALUES($1, $2) RETURNING id";

//connect to database
const insertRecord = async (query: string ,record: ICityPostCode) => {
    const res = await database.execute<number>(query, [record.city_name, record.postal_code], "rows");
    return res;
}

export const addAddresses = async () => {
    for(let i = 0; i < cities.length; i++)
    {
        const res = await insertRecord(queryCityPostCode,cities[i]);
        console.log(res);
    }
}
