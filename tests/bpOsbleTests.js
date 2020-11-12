import { async } from 'regenerator-runtime';
import { Selector } from 'testcafe';

//Outline of what we need
//Test Case Login Page
//Test Case Sign Up Page
//Test Case Forgot Password Page
//Test Case Forgot Username Page

fixture .page();

test('LoginGoesToLoginPage', async t => {
    await t
        .typeText('#emailInput', 'joshua.stallworth@wsu.edu')
        .typeText('#passwordInput', '123#abc')
        
});

test('LoginGoesToSignUpPage', async t => {
    await t
        .click('#signup-button');

        let articleHeader = await Selector('.result-content').find('h1');

        let headerText = await articleHeader.innerText;
});

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
});