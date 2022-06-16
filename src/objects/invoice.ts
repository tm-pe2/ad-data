import { INVOICE_STATUS, INVOICE_TYPE } from '../models/enums';
import { Estimation } from '../models/estimation';
import { Contract, Invoice, MissingInvoiceContract, Tariff } from '../models/invoice';
import { getEstimationById, getTariffById, getContractById, getAllContractsWithMissingInvoices } from '../services/invoice';

let missingInvoices: MissingInvoiceContract[] = []; 

//get contracts
const getContractsWithMissingInvoices = async () => {
    missingInvoices = await getAllContractsWithMissingInvoices();
}

//generate one invoice based on cuntract
const generateAdvanceInvoice = async (contract: Contract) => {
    const tarrif: Tariff = await getTariffById(contract.tariff_id);
    const estimation: Estimation = await getEstimationById(contract.estimation_id);

    let invoice: Invoice = {
        id: -1,
        contract_id: contract.id,
        supplier_id: 0, //TODO get all suppliers and get a random id from array suppliers
        creation_date: new Date(), //TODO generate the date based on the given month
        due_date: new Date(), //TODO creation date.month + 1
        status: INVOICE_STATUS.DUE,
        price: tarrif.value * Number(estimation.estimated_consumption),
        tax: tarrif.value * Number(estimation.estimated_consumption) * 0.21,
        period_start: new Date(), //TODO generate the date based on the given month
        period_end: new Date(), //TODO creation date.month + 1
        type: INVOICE_TYPE.ADVANCE,
        address: null,  //TODO get address
        customer: null  //TODO get customer
    }

    console.log(invoice);
}

export const fillInvoicesArray = async () => {
    const currentDate: Date = new Date();
    await getContractsWithMissingInvoices();
    for(let i = 0; i < missingInvoices.length; i++) {
        console.log(missingInvoices[i]);
        let contract: Contract = await getContractById(missingInvoices[i].contract_id);
        // console.log(contract);

        // //check anual Invoice
        // if(missingInvoices[i].read_date.getFullYear() < currentDate.getFullYear()) {

        //     for(let j = 0; j < 11; j++) {
        //         //generate adnvance
        //         console.log("Generating advance invoices!");
        //     }

        //     //generate anual
        //     console.log("Generating annual invoice!");
        // }

        // //check advance Invoice (contract.read_date)
        // if(missingInvoices[i].read_date.getFullYear() == currentDate.getFullYear()) {
        //     const monthDiff = currentDate.getMonth() - missingInvoices[i].read_date.getMonth();
        //     for(let z = 0; z < monthDiff; z++){
        //         console.log("Generating ONLY advance invoices!");
        //         //await generateAdvanceInvoice()
        //     }
        // }
    }
}
