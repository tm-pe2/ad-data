import { faker } from '@faker-js/faker';
import { Address } from '../models/address';
import { User } from '../models/user';
import { addAddresses } from '../objects/address';
import * as bcrypt from 'bcrypt';

faker.setLocale('nl_BE');
let addresses: Address[] = [];
let users: User[] = [];

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
        active: true
    }

    return usr;
}

//passwords
async function genHshedPAssword(): Promise<string> {
    let hashedPw: string = '';
    
    const salt = await bcrypt.genSalt(10);
    hashedPw = await bcrypt.hash('password123', salt);
    
    return hashedPw;
}

for(let i = 0; i < 20; i++) {
    addresses.push(generateAddress());
    users.push(generateUser());
}

export const addUsers = async() => {
    for(let i = 0; i < 20; i++){
        users[i].password = await genHshedPAssword();
        // do http calls
    }
    console.log(addresses);
    console.log(users);
}