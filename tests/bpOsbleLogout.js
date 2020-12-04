import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture`bp-osble`
    .page`http://localhost:8081`;

test("TestLogOutButton", async t => {
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'joshua.stallworth@wsu.edu')
        .typeText(passwordInput, 'ABC123#abc')
        .click('#login')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#profile')
        .click('#logoutButton')
        .expect(Selector('#loginPage').visible).eql(true)

})