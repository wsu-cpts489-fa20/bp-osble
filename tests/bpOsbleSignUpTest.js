import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture `bp-osble`
.page `http://localhost:8081`;

test('TestSignUpPage', async t => {

    //testing variables
    const accountBtn = Selector('button').withAttribute('type', 'button', 'class', 'btn btn-link login-link', 'Create an account');
    const emailSignUp = Selector('input').withAttribute('name', 'email');
    const emailComf = Selector('input').withAttribute('name', 'confirm_email');
    const passwordSignUp = Selector('input').withAttribute('class', 'form-control form-text form-center', 'name', 'password', 'type', 'password');
    const passwordComf = Selector('input').withAttribute('name', 'confirm_password');
    const firstName = Selector('input').withAttribute('name', 'first_name');
    const lastName = Selector('input').withAttribute('name', 'last_name');
    const lastNameComf = Selector('input').withAttribute('name', 'confirm_last_name');
    const firstNameComf = Selector('input').withAttribute('name', 'confirm_first_name');
    const schoolInfo = Selector('select').withAttribute('name', 'school', 'class', 'form-control form-center');
    const schoolID = Selector('input').withAttribute('name', 'id', 'type', 'number');
    const schoolIDComf = Selector('input').withAttribute('name', 'confirm_id', 'type', 'number');
    const registerBtn = Selector('button').withAttribute('class', 'register-btn', 'role', 'submit', 'type', 'submit');
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .click(accountBtn)
        .typeText(emailSignUp,'hermes_esono@hotmail.com')
        .typeText(emailComf,'hermes_esono@hotmail.com')
        .typeText('#passwordReg','Password123abc')
        .typeText(passwordComf,'Password123abc')
        .typeText(firstName,'Tom')
        .typeText(lastName,'Stall')
        .typeText(lastNameComf,'Stall')
        .typeText(firstNameComf,'Tom')
        .typeText(schoolID,'1234567890')
        .typeText(schoolIDComf,'1234567890')
        .click(registerBtn)
        .expect(Selector('#loginPage').visible).eql(true)
        .typeText('#emailInput', 'hermes_esono@hotmail.com')
        .typeText(passwordInput, 'Password123abc')
        .click('#login-btn-icon')
        .expect(Selector('#profile').innerText).contains('Tom Stall');
});