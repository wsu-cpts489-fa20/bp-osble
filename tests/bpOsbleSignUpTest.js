import { Selector } from 'testcafe';


fixture `bp-osble`
.page `http://localhost:8081`;

test('LoginPageGoesToSignUpPage', async t => {

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

    await t
        .click(accountBtn)
        .typeText(emailSignUp,'hermes_esono@hotmail.es')
        .typeText(emailComf,'hermes_esono@hotmail.es')
        .typeText('#passwordReg','Password123abc')
        .typeText(passwordComf,'Password123abc')
        .typeText(firstName,'Josh')
        .typeText(lastName,'Stallworth')
        .typeText(lastNameComf,'Stallworth')
        .typeText(firstNameComf,'Josh')
        .typeText(schoolID,'1234567890')
        .typeText(schoolIDComf,'1234567890')
        .click(registerBtn);
        //.expect();
});