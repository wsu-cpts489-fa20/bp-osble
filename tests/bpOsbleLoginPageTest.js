import { async } from 'regenerator-runtime';
import { Selector } from 'testcafe';

//Outline of what we need
//Test Case Login Page
//Test Case Sign Up Page
//Test Case Forgot Password Page
//Test Case Forgot Username Page

fixture `bp-osble`
.page `http://localhost:8081`;

//This test performs a simple check to see if we are on the
//login page
test('TestLoginPage', async t => {

    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'joshua.stallworth@wsu.edu')
        .typeText(passwordInput, '123#abc;')
        .click('#login-btn-icon');
       
        
});

// test('LoginGoesToSignUpPage', async t => {
//     await t
//         .click('#signup-button');

//         let articleHeader = await Selector('.result-content').find('h1');

//         let headerText = await articleHeader.innerText;
// });
/* 
test('LoginGoesToForgotPasswordPage', async t => {
    await t
        .click('#forgotpassword-button');

        let articleHeader = await Selector('.result-content').find('h1');

        let headerText = await articleHeader.innerText;
});

test('LoginGoesToForgotUsernamePage', async t => {
    await t
        .click('#forgotusername-button');

        let articleHeader = await Selector('.result-content').find('h1');

        let headerText = await articleHeader.innerText;
}); */