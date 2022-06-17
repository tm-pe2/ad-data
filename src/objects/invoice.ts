import { Address } from '../models/address';
import { INVOICE_STATUS, INVOICE_TYPE } from '../models/enums';
import { Estimation } from '../models/estimation';
import { Contract, Invoice, MissingInvoiceContract, Tariff } from '../models/invoice';
import { Customer } from '../models/user';
import { getEstimationById, getTariffById, getContractById, getAllContractsWithMissingInvoices, getCustomerByContractId, getAddressById } from '../services/invoice';

let missingInvoices: MissingInvoiceContract[] = []; 
let advanceInvoices: Invoice[] = [];

//get contracts
const getContractsWithMissingInvoices = async () => {
    missingInvoices = await getAllContractsWithMissingInvoices();
}

//generate one invoice based on cuntract
const generateAdvanceInvoice = async (contract: Contract, currentDate: Date) => {
    const tariff: Tariff = await getTariffById(contract.tariff_id);
    const estimation: Estimation = await getEstimationById(contract.estimation_id);
    const customer: Customer = await getCustomerByContractId(contract.id);
    const address: Address = await getAddressById(Number(contract.address_id));

    //set dates
    let dueDate: Date = new Date(currentDate);
    dueDate.setMonth(dueDate.getMonth() + 1);

    let invoice: Invoice = {
        id: -1,
        contract_id: contract.id,
        supplier_id: 0, //TODO get all suppliers and get a random id from array suppliers
        creation_date: new Date(currentDate),
        due_date: new Date(dueDate),
        status: INVOICE_STATUS.DUE,
        price: tariff.value * Number(estimation.estimated_consumption),
        tax: tariff.value * Number(estimation.estimated_consumption) * 0.21,
        period_start: new Date(currentDate),
        period_end: new Date(dueDate),
        type: INVOICE_TYPE.ADVANCE,
        address: address, 
        customer: customer
    }

    advanceInvoices.push(invoice);
}

export const fillInvoicesArray = async () => {
    const currentDate: Date = new Date();
    await getContractsWithMissingInvoices();
    //for(let i = 0; i < missingInvoices.length; i++) {
    for(let i = 0; i < missingInvoices.length; i++) {
        let contract: Contract = await getContractById(missingInvoices[i].contract_id);
        //console.log(contract);
        //check anual Invoice
        if(missingInvoices[i].read_date.getFullYear() < currentDate.getFullYear()) {

            for(let j = 0; j < 11; j++) {
                //generate adnvance
                let tempDate: Date = new Date(missingInvoices[i].read_date);
                let tempStartMonth: number = tempDate.getMonth();
                tempDate.setMonth(tempStartMonth + Number(j));
                await generateAdvanceInvoice(contract, new Date(tempDate));
            }

            //generate anual
            console.log("Generating annual invoice!");
        }

        //check advance Invoice (contract.read_date)
        if(missingInvoices[i].read_date.getFullYear() == currentDate.getFullYear()) {
            const monthDiff = currentDate.getMonth() - missingInvoices[i].read_date.getMonth();
            for(let z = 0; z < monthDiff; z++){
                console.log("Generating ONLY advance invoices!");
                //await generateAdvanceInvoice()
            }
        }
    }
    console.log(advanceInvoices.length);
}
