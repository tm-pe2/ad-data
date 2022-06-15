import { addUsers } from './objects/user';
import { addEstimation } from './objects/estimation';
import { addConsumption } from './objects/consumption';
import { end, execute, init } from './utils/database';

init();

//addUsers();
//addEstimation();
addConsumption();

end();