export const invoiceQurys = {
    getTariffById: `
        SELECT * FROM tariffs WHERE id = $1
    `,
    getEstimationById: `
        SELECT * FROM estimations WHERE id = $1
    `,
    getContractById: `
        SELECT * FROM contracts WHERE id = $1
    `,
    getAllContractsWithMissingInvoices: `
        SELECT * FROM indexed_values as i
        INNER JOIN contracts_meters cm 
        ON i.meter_id = cm.meter_id
    `
}