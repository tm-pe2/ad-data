import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';

if (process.env.NODE_ENV == 'test') {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });
}
else {
    dotenv.config();
}

let pool : Pool;

export function init() {
    try {

        const credentials = {
            user: process.env.DB_USER ?? '',
            host: process.env.DB_HOST ?? '',
            database: process.env.DB_DATABASE ?? '',
            password: process.env.DB_PASSWORD ?? '',
            port: Number(process.env.DB_PORT),
        };

        pool = new Pool(credentials);
        console.log("Connection established succesfully");
    } catch (error) {
        console.error("Error trying to connect: ", error);
    }
}

export function end() {
    try {
        pool.end()

        console.log("Connection closed succesfully");
    } catch (error) {
        console.error("Error trying to end connection: ", error);
    }
}


export const execute = <T>(query: string, params: any[], option?: string): Promise<T> => {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, results: any) => {
                if (error)
                    reject(error);
                if(option)
                    resolve(results[option]);
                else
                    resolve(results);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}