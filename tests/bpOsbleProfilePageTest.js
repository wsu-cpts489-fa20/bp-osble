import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture `bp-osble`
.page `http://localhost:8081`;

test("TestSettingPage", async t =>{
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');
    const ID = Selector('#userID');
    await t
        .typeText('#emailInput', 'tianhao.ye@wsu.edu')
        .typeText(passwordInput, 'YTHyth12')
        .click('#login-btn')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#profile')
        .click('#viewProfile')
        .expect(Selector('#profilePage').visible).eql(true)
        //.expect(Selector('#userID').innerText).contains('John Ye');
})