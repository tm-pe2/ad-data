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
    getCustomerByContractId: `
        SELECT 
            u.id,
            u.first_name,
            u.last_name,
            u.birth_date,
            u.email,
            u.phone_number,
            u.national_registry_number,
            c.type_id as customer_type,
            u.active,
            array_agg(r.id) as roles
        FROM customers as c
        LEFT JOIN users as u ON c.user_id = u.id
        LEFT JOIN users_roles as ur ON u.id = ur.user_id
        LEFT JOIN roles as r ON ur.role_id = r.id
        LEFT JOIN customers_contracts as cc ON cc.user_id = c.user_id
        WHERE cc.contract_id = $1
        GROUP BY u.id, c.type_id
    `,
    getAddressById: `
        SELECT * FROM addresses WHERE id = $1
    `,
    getAllContractsWithMissingInvoices: `
        SELECT * FROM indexed_values as i
        INNER JOIN contracts_meters cm 
        ON i.meter_id = cm.meter_id
    `
}