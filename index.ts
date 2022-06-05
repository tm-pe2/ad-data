const amountOfData = 20;
//documentation: https://fakerjs.dev/guide/
import { faker } from '@faker-js/faker';

faker.setLocale('nl_BE');

let userArray = [];

for (let i=0;i<amountOfData;i++) {
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let password = 'password';

    let birthdate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
    let email = faker.internet.email(firstname, lastname);

    let phone = faker.phone.phoneNumber('+32 4## ## ## ##');

    const user = {
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        email: email,
        password: password,
        phone: phone
    }
    userArray.push(user);
}

console.log(userArray);