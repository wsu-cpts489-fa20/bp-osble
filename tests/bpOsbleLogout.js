import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture`bp-osble`
    .page`http://localhost:8081`;

test("TestLogOutButton", async t => {
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'joshua@me.com')
        .typeText(passwordInput, 'Cpts48912')
        .click('#login-btn')
        .click('#NavBarFeed')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#profile')
        .click('#logoutButton')
        .expect(Selector('#loginPage').visible).eql(true)

})