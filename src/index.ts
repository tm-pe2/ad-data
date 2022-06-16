import { addUsers } from './objects/user';
import { addEstimation } from './objects/estimation';
import { addFirstIndexedValues, addMissingConsumptions } from './objects/consumption';
import { fillInvoicesArray } from './objects/invoice';
import { end, execute, init } from './utils/database';

const doWork = async () => {
    init();
    //await addUsers();
    //await addEstimation();
    //await addFirstIndexedValues();
    //await addMissingConsumptions();
    //await fillInvoicesArray();
    end();
}

doWork();