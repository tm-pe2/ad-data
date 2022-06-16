import { addUsers } from './objects/user';
import { addEstimation } from './objects/estimation';
import { addFirstIndexedValues, addMissingConsumptions } from './objects/consumption';
import { end, execute, init } from './utils/database';

const doWork = async () => {
    init();
    //addUsers();
    //await addEstimation();
    //await addFirstIndexedValues();
    await addMissingConsumptions();
    end();
}

doWork();