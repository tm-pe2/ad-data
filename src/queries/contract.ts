export const contractQueries = {
    getNonActiveContracts: `
    SELECT c.id, array_agg(
        json_build_object(
            'id', cm.meter_id, 
            'meter_type', m.meter_type, 
            'physical_id', m.physical_id
            )) as meters 
        FROM contracts c
        INNER JOIN contracts_meters cm ON c.id = cm.contract_id
        INNER JOIN meters m on m.id = cm.meter_id
        WHERE c.status_id = 1
        GROUP BY c.id
    `
}