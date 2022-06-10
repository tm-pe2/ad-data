import { faker } from '@faker-js/faker';
import { Address } from '../models/address';
import { Customer, Employee, User } from '../models/user';
import { CustomerType, UserRole } from '../files/enums';

faker.setLocale('nl_BE');
let users: User[] = [];
let customers: Customer[] = [];
let employees: Employee[] = [];

function getRandomInt(min:number ,max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function generateRegistryNumber(day: number, month: number, year: number): string {
    let nrn : string = '';
    let randLastThreeDigits : number = getRandomInt(100,999);
    let randLastTwoDigits : number = getRandomInt(10,99);
    let yearStr : string = year.toString().substring(2,4);
    let twoMonth : string;
    let twoDay : string;

    if(month < 10) {
        twoMonth = ("0" + month).slice(-2);
    }
    else {
        twoMonth = month.toString();
    }

    if(day < 10) {
        twoDay = ("0" + day).slice(-2);
    }
    else {
        twoDay = day.toString();
    }

    nrn = yearStr + "." + twoMonth + "." + twoDay + "-" + randLastThreeDigits + "." + randLastTwoDigits;

    return nrn;
}

//address
function generateAddress(): Address {
    let address: Address = {
        street: faker.address.street(),
        city_id: getRandomInt(1,2757),
        house_number: String(getRandomInt(1,250)),
        country: "Belgium"
    }

    return address;
}

//user
function generateUser(): User {
    
    let randAddressNumber = 0;
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let birthDate = faker.date.birthdate({min: 18, max: 80, mode: 'age'});
    let phoneNumber = faker.phone.phoneNumber('+32 47# ## ## ##');
    let email = faker.internet.email(firstName, lastName);
    let national_registryNumber = generateRegistryNumber(birthDate.getDate(), birthDate.getMonth() + 1, birthDate.getFullYear());

    let usr: User = {
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        phone_number: phoneNumber,
        email: email,
        national_registry_number: national_registryNumber,
        password: "password123",
        active: true,
        address: []
    }

    randAddressNumber = getRandomInt(1,3);

    for(let i = 0; i < randAddressNumber; i++)
    {
        usr.address.push(generateAddress());
    }

    return usr;
}

function generateCustomer(user: User): Customer {
    let customer: Customer = {
        first_name: user.first_name,
        last_name: user.last_name,
        birth_date: user.birth_date,
        phone_number: user.phone_number,
        email: user.email,
        national_registry_number: user.national_registry_number,
        password: user.password,
        active: user.active,
        address: user.address,
        type: getRandomInt(1,2)
    }

    return customer;
}

function generateEmployee(user: User): Employee {
    let employee: Employee = {
        first_name: user.first_name,
        last_name: user.last_name,
        birth_date: user.birth_date,
        phone_number: user.phone_number,
        email: user.email,
        national_registry_number: user.national_registry_number,
        password: user.password,
        active: user.active,
        address: user.address,
        hire_date: faker.date.birthdate({min: 0, max: 42, mode: 'age'}), // returns a date = min today and max 42 years ago
        salary: parseFloat(faker.finance.amount(900.00, 5500.00, 2))
    }

    return employee;
}

for(let i = 0; i < 20; i++) {
    users.push(generateUser());
    if( i < 15 ) 
    {
        customers.push(generateCustomer(users[i]));
    }
    else 
    {
        employees.push(generateEmployee(users[i]));
    }
}

export const addUsers = async() => {
    for(let i = 0; i < 20; i++){
        // do http calls
    }
    customers.forEach(cus => {
        console.log(cus);
    });

    employees.forEach(emp => {
        console.log(emp);
    });
}