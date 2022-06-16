import { ContractMeters } from '../models/consumption';
import { contractQueries } from '../queries/contract';
import { execute } from '../utils/database';

export const getNonActiveContracts = async (): Promise<ContractMeters[]> => {
    return await execute<ContractMeters[]>(contractQueries.getNonActiveContracts, [], "rows");
}