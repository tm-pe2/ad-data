import { ContractMeters } from '../models/consumption';
import { contractQueries } from '../queries/contract';
import { execute } from '../utils/database';

export const getNonActiveContracts = async (): Promise<ContractMeters[]> => {
    const res = await execute<ContractMeters[]>(contractQueries.getNonActiveContracts, [], "rows");
    return res; 
}