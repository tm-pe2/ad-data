import { faker } from '@faker-js/faker';
import { Address } from '../models/address';
import { Customer, Employee, User } from '../models/user';
import fetch from 'node-fetch';
import { UserRole } from '../models/enums';

faker.setLocale('nl_BE');
let users: User[] = [];
let customers: Customer[] = [];
let employees: Employee[] = [];
let role: UserRole[] = [UserRole.ADMIN,UserRole.EMPLOYEE,UserRole.MANAGER,UserRole.HR_MANAGER];
let j: number = 0;

function getRandomInt(min:number ,max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//registry number
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

    nrn = yearStr + twoMonth + twoDay + randLastThreeDigits + randLastTwoDigits;

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
    let phoneNumber = faker.phone.phoneNumber('+3247#######');
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
        addresses: []
    }

    randAddressNumber = getRandomInt(1,3);

    for(let i = 0; i < randAddressNumber; i++)
    {
        usr.addresses.push(generateAddress());
    }

    return usr;
}

//customer
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
        addresses: user.addresses,
        customer_type: getRandomInt(1,2)
    }

    return customer;
}

//emplyee
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
        roles: [],
        addresses: user.addresses,
        hire_date: faker.date.birthdate({min: 0, max: 42, mode: 'age'}), // returns a date = min today and max 42 years ago
        salary: parseFloat(faker.finance.amount(900.00, 5500.00, 2))
    }

    return employee;
}

//fill array of employees and custoamers
for(let i = 0; i < 10; i++) {
    users.push(generateUser());
    if( i < 5 ) 
    {
        customers.push(generateCustomer(users[i]));
    }
    else 
    {
        if( j < 4 ) 
        {
            //console.log("CURRENT ROLE : " + role[j]);
            const tempEmployee: Employee = generateEmployee(users[i]);
            tempEmployee.roles?.push(role[j]);
            employees.push(tempEmployee);
        } 
        else 
        {
            j = 0;
            const tempEmployee: Employee = generateEmployee(users[i]);
            tempEmployee.roles?.push(role[j]);
            employees.push(tempEmployee);
        }
        j++;
    }
}

//add employees to database
export const addUsers = async() => {
    console.log("Adding customers ...");
    for(let i = 0; i < 5; i++){
        const response = await fetch('http://localhost:3000/customers', {
            method: 'POST',
            body: JSON.stringify(customers[i]),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    }

    console.log("Customers added!");
    console.log("Adding employees ...");

    for(let i = 0; i < 5; i++){
        const response = await fetch('http://localhost:3000/employees', {
            method: 'POST',
            body: JSON.stringify(employees[i]),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
    }

    console.log("Employees added!");
}