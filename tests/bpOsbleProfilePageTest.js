import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture `bp-osble`
.page `http://localhost:8081`;

test("TestSettingPage", async t =>{
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');
    const ID = Selector('#userID');
    await t
        .typeText('#emailInput', 'hermes_esono@hotmail.es')
        .typeText(passwordInput, 'Galaxy2020')
        .click('#login-btn')
        .click('#NavBarFeed')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#profile')
        .click('#viewProfile')
        .expect(Selector('#profilePage').visible).eql(true)
       
})