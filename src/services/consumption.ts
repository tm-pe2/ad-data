import { consumtionQueries } from '../queries/consumption';
import { execute } from '../utils/database';
import { IndexedValues } from '../models/consumption';
import { Meter } from '../models/estimation';

export const getAllIndexedValues =async (): Promise<IndexedValues[]> => {
    return await execute<IndexedValues[]>(consumtionQueries.getAllIndexedValues, [], "rows");
}

export const getMeterById =async (id: number): Promise<Meter[]> => {
    return await execute<Meter[]>(consumtionQueries.getMeterById, [id], "rows");
}