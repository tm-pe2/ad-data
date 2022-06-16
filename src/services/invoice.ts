import { Contract, MissingInvoiceContract, Tariff } from '../models/invoice';
import { Estimation } from '../models/estimation';
import { execute } from '../utils/database';
import { invoiceQurys } from '../queries/invoice';
import { Customer } from '../models/user';
import { Address } from '../models/address';

export const getEstimationById = async (id: number): Promise<Estimation> => {
    const estimation = await execute<Estimation[]>(invoiceQurys.getEstimationById, [id], "rows")
    return estimation[0];
}

export const getTariffById = async (id: number): Promise<Tariff> => {
    const  tariff = await execute<Tariff[]>(invoiceQurys.getTariffById, [id], "rows");
    return tariff[0];
}

export const getContractById = async (id: number): Promise<Contract> => {
    const contract = await execute<Contract[]>(invoiceQurys.getContractById, [id], "rows");
    return contract[0];
}

export const getCustomerByContractId = async (id: number): Promise<Customer> => {
    const customer = await execute<Customer[]>(invoiceQurys.getCustomerByContractId, [id], "rows");
    return customer[0];
}

export const getAddressById = async (id: number): Promise<Address> => {
    const address = await execute<Address[]>(invoiceQurys.getAddressById, [id], "rows");
    return address[0];
}

export const getAllContractsWithMissingInvoices = async (): Promise<MissingInvoiceContract[]> => {
    return await execute<MissingInvoiceContract[]>(invoiceQurys.getAllContractsWithMissingInvoices, [], "rows");
}