import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture`bp-osble`
    .page`http://localhost:8081`;

test("TestDropdownMenu", async t => {
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'hermes_esono@hotmail.es')
        .typeText(passwordInput, 'Galaxy2020')
        .click('#login-btn')
        .click('#NavBarFeed')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#profile')
        .click('#viewMail')
        .expect(Selector('#mailpage').visible).eql(true)
        .click('#profile')
        .click('#viewSettings')
        .expect(Selector('#settingPage').visible).eql(true)
        .click('#changeNameButton')
        .expect(Selector('#profilePage').visible).eql(true)
        .click('#viewHelp')
        .expect(Selector('#helpPage').visible).eql(true)
})